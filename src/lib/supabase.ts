import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Lazy factory instead of a module-scope singleton.
 *
 * Previously this file created the client eagerly at import time with a
 * non-null assertion on the env vars — any module graph that reached this
 * file during prerendering (e.g. `/` importing ContactSection) crashed the
 * entire build whenever NEXT_PUBLIC_SUPABASE_URL/ANON_KEY weren't set, even
 * for pages that never call Supabase. In Vercel with real env vars this
 * never surfaced; it only breaks environments without secrets (fresh CI
 * checkouts, this audit worktree — see docs/V3-MIGRATION-PLAN.md section 11).
 *
 * This mirrors the pattern already used in github.com/gabrielle-git/CatCare
 * (src/lib/supabase/server.ts exposes a createClient() function, not an
 * eager module-scope client) — same auth/RLS behavior, just instantiated on
 * demand instead of at import time.
 */
export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase env vars ausentes (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
