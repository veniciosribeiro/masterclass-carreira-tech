import { TestResult, Answer } from '../test/testTypes';
import { apiFetch, setAuthToken } from './apiClient';

/**
 * Generates a structured JSON object for the test result.
 * This JSON can be consumed by a LLM or any downstream system.
 */
export function generateResultJSON(result: TestResult): object {
  return {
    version: '1.0',
    generatedAt: result.timestamp,
    student: {
      name: result.userName,
      email: result.userEmail,
    },
    profile: {
      type: result.profile.primary,
      label: result.profile.label,
      description: result.profile.description,
      strengths: result.profile.strengths,
      recommendation: result.profile.recommendation,
    },
    scores: {
      areas: {
        frontend: {
          raw: result.scores.areas.frontend,
          percent: result.scores.areasPercent.frontend,
        },
        backend: {
          raw: result.scores.areas.backend,
          percent: result.scores.areasPercent.backend,
        },
        dataAI: {
          raw: result.scores.areas.dataAI,
          percent: result.scores.areasPercent.dataAI,
        },
      },
      behavioral: {
        resilience: {
          raw: result.scores.behavioral.resilience,
          percent: result.scores.behavioralPercent.resilience,
        },
        logic: {
          raw: result.scores.behavioral.logic,
          percent: result.scores.behavioralPercent.logic,
        },
        proactivity: {
          raw: result.scores.behavioral.proactivity,
          percent: result.scores.behavioralPercent.proactivity,
        },
      },
    },
    answers: result.answers.map((a) => ({
      questionId: a.questionId,
      type: a.questionType,
      selectedOptionId: a.selectedOptionId ?? null,
      orderedStepIds: a.orderedStepIds ?? null,
    })),
  };
}

// ═══════════════════════════════════════════════════
// Auth
// ═══════════════════════════════════════════════════

/**
 * Validates if an email is authorized to take the quiz.
 * On success, stores the JWT token for subsequent requests.
 */
export async function validateEmail(
  email: string
): Promise<{ authorized: boolean; name?: string }> {
  const result = await apiFetch<{
    authorized: boolean;
    name?: string;
    token?: string;
  }>('/auth/validate-email', {
    method: 'POST',
    body: JSON.stringify({ email: email.toLowerCase().trim() }),
  });

  if (result.authorized && result.token) {
    setAuthToken(result.token);
  }

  return {
    authorized: result.authorized,
    name: result.name,
  };
}

// ═══════════════════════════════════════════════════
// Session management
// ═══════════════════════════════════════════════════

export interface SessionData {
  session_id: string;
  user_email?: string;
  user_name?: string;
  answers: Answer[];
  current_question: number;
  status?: string;
  shuffled_orderings: Record<string, string[]>;
  resumed?: boolean;
  error?: string;
}

/**
 * Creates a new session or resumes an existing in_progress one.
 * Email is extracted from the JWT on the server — only name is sent.
 */
export async function createSession(
  _email: string,
  name: string
): Promise<SessionData | { error: string }> {
  try {
    const data = await apiFetch<SessionData>('/sessions', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
    return data;
  } catch (err) {
    console.error('Create session error:', err);
    return { error: 'network_error' };
  }
}

/**
 * Saves current progress to the session.
 */
export async function saveProgress(
  sessionId: string,
  answers: Answer[],
  currentQuestion: number,
  shuffledOrderings?: Record<string, string[]>
): Promise<boolean> {
  try {
    await apiFetch(`/sessions/${sessionId}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({
        answers,
        currentQuestion,
        shuffledOrderings: shuffledOrderings ?? undefined,
      }),
    });
    return true;
  } catch (err) {
    console.error('Save progress error:', err);
    return false;
  }
}

/**
 * Retrieves a session for state restoration (e.g. after F5).
 */
export async function getSession(
  sessionId: string
): Promise<SessionData | null> {
  try {
    const data = await apiFetch<SessionData>(`/sessions/${sessionId}`);
    if (data.error) return null;
    return data;
  } catch (err) {
    console.error('Get session error:', err);
    return null;
  }
}

/**
 * Marks a session as completed.
 */
export async function completeSession(sessionId: string): Promise<boolean> {
  try {
    await apiFetch(`/sessions/${sessionId}/complete`, { method: 'PATCH' });
    return true;
  } catch (err) {
    console.error('Complete session error:', err);
    return false;
  }
}

/**
 * Saves the test result to the backend.
 * Returns true if saved successfully, false on error.
 */
export async function saveTestResult(result: TestResult): Promise<boolean> {
  const resultJSON = generateResultJSON(result);

  try {
    await apiFetch('/results', {
      method: 'POST',
      body: JSON.stringify({
        userName: result.userName,
        userEmail: result.userEmail,
        answers: result.answers,
        areaScores: result.scores.areasPercent,
        profile: result.profile.primary,
        behavioralScores: result.scores.behavioralPercent,
        resultJson: resultJSON,
      }),
    });
    return true;
  } catch (err) {
    console.error('Save error:', err);
    return false;
  }
}
