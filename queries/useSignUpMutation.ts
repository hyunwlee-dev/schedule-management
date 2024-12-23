import { signUp } from '@actions/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (req: { email: string; password: string }) => signUp(req),
  });
};
