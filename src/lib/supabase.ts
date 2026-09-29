import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url === 'your_supabase_url_here') {
      console.warn('⚠️ Supabase credentials not configured. Add them to .env.local');
      // Create a dummy client that won't crash the app
      _supabase = createClient('https://localhost.supabase.co', 'placeholder');
    } else {
      _supabase = createClient(url, key);
    }
  }
  return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as Record<string | symbol, unknown>)[prop];
  },
});
