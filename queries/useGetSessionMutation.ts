import { getSession } from '@actions/auth';
import { useMutation } from '@tanstack/react-query';

export const useGetSessionMutation = () => {
  return useMutation({
    mutationFn: getSession,
  });
};
