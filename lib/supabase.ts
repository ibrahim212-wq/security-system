// ─────────────────────────────────────────────
// Supabase client configuration
//
// This file creates a single shared Supabase client instance
// that can be imported anywhere in the app.
//
// The values come from environment variables defined in .env.local
// NEXT_PUBLIC_ prefix makes them accessible in the browser.
// ─────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Export the client so any page or component can use it:
// import { supabase } from "@/lib/supabase"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
