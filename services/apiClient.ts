const API_BASE = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Stores the JWT token in localStorage.
 */
export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

/**
 * Retrieves the JWT token from localStorage.
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

/**
 * Removes the JWT token from localStorage.
 */
export function clearAuthToken(): void {
  localStorage.removeItem('auth_token');
}

/**
 * Sends the test results via email after test completion.
 * Fire-and-forget operation - logs errors but doesn't block the test results flow.
 */
export async function sendEmailResult(sessionId: string): Promise<void> {
  console.log('[SEND_EMAIL] Attempting to send email for session:', sessionId);

  try {
    // Backend expects sessionId in URL, not body
    const response = await fetch(
      'http://localhost:4000/api/send-results/' + sessionId,
      {
        method: 'POST',
      }
    );

    console.log(
      '[SEND_EMAIL] Response status:',
      response.status,
      response.statusText
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('[SEND_EMAIL] Failed to send email. Response:', errorText);
    } else {
      console.log('[SEND_EMAIL] ✅ Email queued successfully');
    }
  } catch (err) {
    console.error('[SEND_EMAIL] ❌ Exception during email API call:', err);
  }
}

/**
 * Centralized HTTP client for the Fastify API.
 * Automatically injects the JWT Authorization header when available.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // Only set Content-Type for requests that have a body
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new ApiError(res.status, body);
  }

  // Handle empty responses (204 No Content, etc.)
  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text);
}
