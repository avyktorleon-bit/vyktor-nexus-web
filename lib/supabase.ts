import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL o Anon Key no configurados en .env.local. El sistema usará el modo local (JSON).");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
