-- ═══════════════════════════════════════════════════
-- Supabase-compatible roles and schema setup
-- ═══════════════════════════════════════════════════

-- Create the anon role used by PostgREST for unauthenticated access
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN NOINHERIT;
  END IF;
END
$$;

-- Grant usage on the public schema to the anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- ═══════════════════════════════════════════════════
-- Authorized Emails table (whitelist)
-- Only emails in this table can take the quiz
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS authorized_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_authorized_emails_email ON authorized_emails (email);

-- ═══════════════════════════════════════════════════
-- Test Results table (final, completed results)
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  answers JSONB NOT NULL,
  area_scores JSONB NOT NULL,
  profile TEXT NOT NULL,
  behavioral_scores JSONB NOT NULL,
  result_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════
-- Test Sessions table (in-progress quiz state)
-- ═══════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS test_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  answers JSONB DEFAULT '[]'::jsonb,
  current_question INT DEFAULT 0,
  status TEXT DEFAULT 'in_progress',
  shuffled_orderings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_test_sessions_email_status
  ON test_sessions (user_email, status);

-- ═══════════════════════════════════════════════════
-- RPC: check_email — validates email against whitelist
-- Returns only {authorized, name}, never exposes table
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION check_email(input_email TEXT)
RETURNS JSON
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(
    (
      SELECT json_build_object('authorized', true, 'name', ae.name)
      FROM authorized_emails ae
      WHERE ae.email = lower(trim(input_email))
        AND ae.active = true
      LIMIT 1
    ),
    json_build_object('authorized', false, 'name', null)
  );
$$;

-- ═══════════════════════════════════════════════════
-- RPC: create_session — creates or resumes a quiz session
-- If an in_progress session exists for the email, returns it.
-- Otherwise validates email and creates a new session.
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION create_session(input_email TEXT, input_name TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_email TEXT := lower(trim(input_email));
  v_session test_sessions%ROWTYPE;
  v_authorized BOOLEAN;
BEGIN
  -- Check if email is authorized
  SELECT EXISTS(
    SELECT 1 FROM authorized_emails
    WHERE email = v_email AND active = true
  ) INTO v_authorized;

  IF NOT v_authorized THEN
    RETURN json_build_object('error', 'unauthorized');
  END IF;

  -- Look for existing in_progress session
  SELECT * INTO v_session
  FROM test_sessions
  WHERE user_email = v_email AND status = 'in_progress'
  ORDER BY updated_at DESC
  LIMIT 1;

  IF v_session.id IS NOT NULL THEN
    -- Return existing session
    RETURN json_build_object(
      'session_id', v_session.id,
      'current_question', v_session.current_question,
      'answers', v_session.answers,
      'shuffled_orderings', v_session.shuffled_orderings,
      'resumed', true
    );
  END IF;

  -- Create new session
  INSERT INTO test_sessions (user_email, user_name)
  VALUES (v_email, input_name)
  RETURNING * INTO v_session;

  RETURN json_build_object(
    'session_id', v_session.id,
    'current_question', 0,
    'answers', '[]'::jsonb,
    'shuffled_orderings', '{}'::jsonb,
    'resumed', false
  );
END;
$$;

-- ═══════════════════════════════════════════════════
-- RPC: save_progress — updates answers and current question
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION save_progress(
  input_session_id UUID,
  input_answers JSONB,
  input_current_question INT,
  input_shuffled_orderings JSONB DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_session test_sessions%ROWTYPE;
BEGIN
  SELECT * INTO v_session
  FROM test_sessions
  WHERE id = input_session_id AND status = 'in_progress';

  IF v_session.id IS NULL THEN
    RETURN json_build_object('error', 'session_not_found');
  END IF;

  UPDATE test_sessions
  SET answers = input_answers,
      current_question = input_current_question,
      shuffled_orderings = COALESCE(input_shuffled_orderings, test_sessions.shuffled_orderings),
      updated_at = NOW()
  WHERE id = input_session_id;

  RETURN json_build_object('ok', true);
END;
$$;

-- ═══════════════════════════════════════════════════
-- RPC: get_session — retrieves session state for restore
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION get_session(input_session_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  v_session test_sessions%ROWTYPE;
BEGIN
  SELECT * INTO v_session
  FROM test_sessions
  WHERE id = input_session_id;

  IF v_session.id IS NULL THEN
    RETURN json_build_object('error', 'not_found');
  END IF;

  RETURN json_build_object(
    'session_id', v_session.id,
    'user_email', v_session.user_email,
    'user_name', v_session.user_name,
    'answers', v_session.answers,
    'current_question', v_session.current_question,
    'status', v_session.status,
    'shuffled_orderings', v_session.shuffled_orderings
  );
END;
$$;

-- ═══════════════════════════════════════════════════
-- RPC: complete_session — marks session as completed
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION complete_session(input_session_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE test_sessions
  SET status = 'completed', updated_at = NOW()
  WHERE id = input_session_id AND status = 'in_progress';

  IF NOT FOUND THEN
    RETURN json_build_object('error', 'session_not_found');
  END IF;

  RETURN json_build_object('ok', true);
END;
$$;

-- ═══════════════════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════════════════

ALTER TABLE authorized_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;

-- authorized_emails: NO direct access for anon
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_select_authorized' AND tablename = 'authorized_emails') THEN
    DROP POLICY "anon_select_authorized" ON authorized_emails;
  END IF;
END $$;

-- test_results: anon can insert only
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_insert_policy' AND tablename = 'test_results') THEN
    CREATE POLICY "anon_insert_policy" ON test_results FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_select_policy' AND tablename = 'test_results') THEN
    DROP POLICY "anon_select_policy" ON test_results;
  END IF;
END $$;

-- test_sessions: NO direct access for anon (all via RPC)
-- (RLS blocks direct access; SECURITY DEFINER functions bypass it)

-- ═══════════════════════════════════════════════════
-- Grant permissions
-- ═══════════════════════════════════════════════════

-- anon: NO direct table access
REVOKE ALL ON authorized_emails FROM anon;
REVOKE ALL ON test_results FROM anon;
REVOKE ALL ON test_sessions FROM anon;
GRANT INSERT ON test_results TO anon;

-- anon: can call RPC functions only
GRANT EXECUTE ON FUNCTION check_email(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION create_session(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION save_progress(UUID, JSONB, INT, JSONB) TO anon;
GRANT EXECUTE ON FUNCTION get_session(UUID) TO anon;
GRANT EXECUTE ON FUNCTION complete_session(UUID) TO anon;

-- authenticated: full access for admin
GRANT SELECT, INSERT, UPDATE, DELETE ON authorized_emails TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON test_results TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON test_sessions TO authenticated;

-- Grant the postgres user the ability to switch to anon/authenticated
GRANT anon TO postgres;
GRANT authenticated TO postgres;

-- ═══════════════════════════════════════════════════
-- Seed: add sample authorized emails for testing
-- ═══════════════════════════════════════════════════

INSERT INTO authorized_emails (email, name) VALUES
  ('teste@teste.com', 'Usuário Teste'),
  ('aluno@masterclass.com', 'Aluno Masterclass')
ON CONFLICT (email) DO NOTHING;
