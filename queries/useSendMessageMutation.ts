import { sendMessage } from '@actions/chatting';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ message, userId }: { message: string; userId: string | null }) => sendMessage({ message, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages'],
      });
    },
  });
};
