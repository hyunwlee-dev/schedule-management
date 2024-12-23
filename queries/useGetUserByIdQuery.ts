import { getUserById } from '@actions/chatting';
import { useQuery } from '@tanstack/react-query';

export const useGetUserByIdQuery = (userId: string | null) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
  });
};
