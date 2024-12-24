import { sendMessage } from '@actions/chatting';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: { msg: string; msg2?: string; url?: string; tel?: string; userId: string | null }) =>
      sendMessage(req),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages'],
      });
    },
  });
};
