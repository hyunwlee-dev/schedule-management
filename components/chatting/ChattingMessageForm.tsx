'use client';

import Input from '@components/commons/input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSendMessageMutation } from '@queries/useSendMessageMutation';
import useSelectedUserIdStore from '@stores/useSelectedUserIdStore';
import cn from '@utils/cn';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { UploadField } from './UploadField';

const FORM_DEFAULT_VALUES = {
  msg: '',
  msg2: '',
  url: '',
  tel: '',
  file: null,
} as const;

const chattingMessageFormSchema = z.object({
  msg: z.string().min(1, '인사말을 입력해주세요'),
  msg2: z.string(),
  url: z.string(),
  tel: z.string(),
  file: z
    .object({
      id: z.string(),
      path: z.string(),
      fullPath: z.string(),
    })
    .nullish(),
});

type ChattingMessageFormType = z.infer<typeof chattingMessageFormSchema>;

function ChattingMessageForm({ className, handleBlur }: { className?: string; handleBlur: () => void }) {
  const { selectedUserId } = useSelectedUserIdStore();
  const { mutateAsync: sendMessage, isPending } = useSendMessageMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChattingMessageFormType>({
    resolver: zodResolver(chattingMessageFormSchema),
    defaultValues: FORM_DEFAULT_VALUES,
  });

  const onSubmit = async (data: ChattingMessageFormType) => {
    await sendMessage({ ...data, userId: selectedUserId });
    reset(FORM_DEFAULT_VALUES);
    handleBlur();
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

      <div className="flex flex-col gap-1">
        <label htmlFor="file" className="text-xs text-slate-600 font-medium">
          file
        </label>
        <UploadField
          control={control}
          name="file"
          supportedFileExtensions={['JPG', 'JPEG', 'PNG', 'ICO', 'PDF', 'DOC', 'DOCX', 'HWP']}
          maxFileSizeMB={10}
        />
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
