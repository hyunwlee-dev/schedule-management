import { getAllMessages } from '@actions/chatting';
import { useQuery } from '@tanstack/react-query';

export const useGetAllMessagesQuery = (userId: string | null) => {
  return useQuery({
    queryKey: ['messages', userId],
    queryFn: async () => await getAllMessages({ userId }),
  });
};
