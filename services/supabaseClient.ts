import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        db: { schema: 'public' },
        global: {
            headers: {
                Authorization: `Bearer ${supabaseAnonKey}`,
            },
        },
        // PostgREST serves at root — override the default /rest/v1 prefix
        realtime: { params: { apikey: supabaseAnonKey } },
    })
    : null;

/**
 * Direct fetch wrapper for PostgREST.
 * The @supabase/supabase-js client prepends /rest/v1/ which raw PostgREST
 * doesn't serve. This bypasses that by calling PostgREST directly.
 */
export async function postgrestFetch(
    table: string,
    options: {
        method?: 'GET' | 'POST';
        body?: object;
        params?: Record<string, string>;
    } = {}
): Promise<{ data: unknown; error: string | null; status: number }> {
    const { method = 'GET', body, params } = options;

    const url = new URL(`${supabaseUrl}/${table}`);
    if (params) {
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }

    const isRpc = table.startsWith('rpc/');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
    };

    // For non-RPC POST (table inserts), we don't need the response body
    if (method === 'POST' && !isRpc) {
        headers['Prefer'] = 'return=minimal';
    }

    try {
        const res = await fetch(url.toString(), {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            const errorBody = await res.text();
            return { data: null, error: errorBody, status: res.status };
        }

        // Table inserts with return=minimal have no body
        if (method === 'POST' && !isRpc) {
            return { data: null, error: null, status: res.status };
        }

        const data = await res.json();
        return { data, error: null, status: res.status };
    } catch (err) {
        return { data: null, error: String(err), status: 0 };
    }
}
