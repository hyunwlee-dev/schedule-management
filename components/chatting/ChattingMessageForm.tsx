'use client';

import Input from '@components/commons/input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSendMessageMutation } from '@queries/useSendMessageMutation';
import useSelectedUserIdStore from '@stores/useSelectedUserIdStore';
import cn from '@utils/cn';
import { useForm } from 'react-hook-form';
import z from 'zod';

const chattingMessageFormSchema = z.object({
  msg: z.string().min(1, '인사말을 입력해주세요'),
  msg2: z.string(),
  url: z.string(),
  tel: z.string(),
});

type ChattingMessageFormType = z.infer<typeof chattingMessageFormSchema>;

function ChattingMessageForm({ className }: { className?: string }) {
  const { selectedUserId } = useSelectedUserIdStore();
  const { mutateAsync: sendMessage, isPending } = useSendMessageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChattingMessageFormType>({
    resolver: zodResolver(chattingMessageFormSchema),
    defaultValues: {
      msg: '',
      msg2: '',
      url: '',
      tel: '',
    },
  });

  const onSubmit = async (data: ChattingMessageFormType) => {
    await sendMessage({ ...data, userId: selectedUserId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-col gap-1">
        <Input
          label="인사말"
          required
          inputProps={{
            ...register('msg'),
          }}
        />
        {errors.msg?.message && <span className="text-xs text-red-500">{errors.msg.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          label="소개"
          inputProps={{
            ...register('msg2'),
          }}
        />
        {errors.msg2?.message && <span className="text-xs text-red-500">{errors.msg2.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          label="url"
          inputProps={{
            ...register('url'),
          }}
        />
        {errors.url?.message && <span className="text-xs text-red-500">{errors.url.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          label="tel"
          inputProps={{
            ...register('tel'),
          }}
        />
        {errors.tel?.message && <span className="text-xs text-red-500">{errors.tel.message}</span>}
      </div>
      <button
        type="submit"
        className={cn('mt-4 bg-blue-500 text-white px-4 py-2 rounded-md', [{ 'opacity-50': isPending }])}
        disabled={isPending}
      >
        전송
      </button>
    </form>
  );
}

export default ChattingMessageForm;
