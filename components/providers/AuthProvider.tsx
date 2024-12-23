'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

import createClient from '@utils/supabase/client';

export default function AuthProvider({ accessToken, children }: PropsWithChildren<{ accessToken?: string }>) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListner },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListner.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
}
