import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client — bypasses Row Level Security.
 * ONLY use this server-side for privileged admin operations.
 * Protected by `import 'server-only'` — will throw a build error
 * if accidentally imported into a Client Component.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
