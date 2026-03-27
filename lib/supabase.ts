import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const SUPABASE_CONFIGURED =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.startsWith('TU_');

if (!SUPABASE_CONFIGURED) {
  console.warn("Supabase URL o Anon Key no configurados en .env.local. El sistema usara el modo local (JSON).");
}

export const supabase = SUPABASE_CONFIGURED
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
