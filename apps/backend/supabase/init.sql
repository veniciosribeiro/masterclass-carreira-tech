-- ═══════════════════════════════════════════════════
-- TechCareer Test-Drive — Database Schema
-- Simplified: no PostgREST roles, no RLS, no RPCs.
-- Access control is handled by the Fastify API layer.
-- ═══════════════════════════════════════════════════

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
-- Seed: sample authorized emails for testing
-- ═══════════════════════════════════════════════════

INSERT INTO authorized_emails (email, name) VALUES
  ('teste@teste.com', 'Usuário Teste'),
  ('aluno@masterclass.com', 'Aluno Masterclass')
ON CONFLICT (email) DO NOTHING;
