import { createClient } from "@supabase/supabase-js"

// supabaseのアクセス
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_TOKEN = import.meta.env.VITE_SUPABASE_TOKEN as string
export const supabase = createClient(SUPABASE_URL,SUPABASE_TOKEN);