import { signIn } from '@actions/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (req: { email: string; password: string }) => signIn(req),
  });
};
