import { signOut } from '@actions/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: signOut,
  });
};
