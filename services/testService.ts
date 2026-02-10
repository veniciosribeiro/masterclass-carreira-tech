import { postgrestFetch } from './supabaseClient';
import { TestResult, Answer } from '../test/testTypes';

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

/**
 * Validates if an email is authorized to take the quiz.
 * Calls the check_email RPC function in PostgreSQL via PostgREST.
 * The function returns only {authorized: bool, name: string|null} —
 * it never exposes the full table or other emails.
 */
export async function validateEmail(email: string): Promise<{ authorized: boolean; name?: string }> {
    const { data, error, status } = await postgrestFetch('rpc/check_email', {
        method: 'POST',
        body: { input_email: email.toLowerCase().trim() },
    });

    if (error || status < 200 || status >= 300) {
        console.error('Email validation error:', error);
        // Fail open in case of network/config error — avoid blocking users
        return { authorized: true };
    }

    const result = data as { authorized: boolean; name: string | null };
    return {
        authorized: result.authorized,
        name: result.name ?? undefined,
    };
}

/**
 * Saves the test result to PostgreSQL via PostgREST.
 * Returns true if saved successfully, false on error.
 */
export async function saveTestResult(result: TestResult): Promise<boolean> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    if (!supabaseUrl) {
        console.warn('PostgREST not configured — skipping save.');
        return false;
    }

    const resultJSON = generateResultJSON(result);

    const { error } = await postgrestFetch('test_results', {
        method: 'POST',
        body: {
            user_name: result.userName,
            user_email: result.userEmail,
            answers: result.answers,
            area_scores: result.scores.areasPercent,
            profile: result.profile.primary,
            behavioral_scores: result.scores.behavioralPercent,
            result_json: resultJSON,
        },
    });

    if (error) {
        console.error('Save error:', error);
        return false;
    }

    return true;
}

// ═══════════════════════════════════════════════════
// Session management — all via SECURITY DEFINER RPCs
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
 * Validates email server-side.
 */
export async function createSession(
    email: string,
    name: string
): Promise<SessionData | { error: string }> {
    const { data, error } = await postgrestFetch('rpc/create_session', {
        method: 'POST',
        body: { input_email: email.toLowerCase().trim(), input_name: name },
    });

    if (error) {
        console.error('Create session error:', error);
        return { error: 'network_error' };
    }

    return data as SessionData;
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
    const { error } = await postgrestFetch('rpc/save_progress', {
        method: 'POST',
        body: {
            input_session_id: sessionId,
            input_answers: answers,
            input_current_question: currentQuestion,
            input_shuffled_orderings: shuffledOrderings ?? null,
        },
    });

    if (error) {
        console.error('Save progress error:', error);
        return false;
    }

    return true;
}

/**
 * Retrieves a session for state restoration (e.g. after F5).
 */
export async function getSession(sessionId: string): Promise<SessionData | null> {
    const { data, error } = await postgrestFetch('rpc/get_session', {
        method: 'POST',
        body: { input_session_id: sessionId },
    });

    if (error) {
        console.error('Get session error:', error);
        return null;
    }

    const session = data as SessionData;
    if (session.error) return null;

    return session;
}

/**
 * Marks a session as completed.
 */
export async function completeSession(sessionId: string): Promise<boolean> {
    const { error } = await postgrestFetch('rpc/complete_session', {
        method: 'POST',
        body: { input_session_id: sessionId },
    });

    if (error) {
        console.error('Complete session error:', error);
        return false;
    }

    return true;
}
