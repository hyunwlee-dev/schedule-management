import { getAllUsers } from '@actions/chatting';
import { useQuery } from '@tanstack/react-query';

export const useGetAllUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
};
