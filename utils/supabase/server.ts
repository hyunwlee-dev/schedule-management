import { cookies } from 'next/headers';

import type { Database } from '@/database.types';
import { createServerClient } from '@supabase/ssr';

/**
 * @description RSC, server action, route handler에서 supabase에 접근하기 위해, 실행되어야 initialize
 */
const createClient = async () => {
  const cookieStore = await cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

export default createClient;
