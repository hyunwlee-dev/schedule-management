import { useEffect } from 'react';

import { useGetAllMessagesQuery } from '@queries/useGetAllMessagesQuery';
import createClient from '@utils/supabase/client';

export const useSupabaseRealtime = (userId: string | null) => {
  const data = useGetAllMessagesQuery(userId);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel('message_postgres_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
        },
        (payload) => {
          if (payload.eventType === 'INSERT' && !payload.errors) {
            data.refetch();
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);
};
