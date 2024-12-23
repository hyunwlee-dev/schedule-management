'use client';

import { useRouter } from 'next/navigation';

import { type SignInFormSchemaType, signInFormSchema } from '@constants/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignInMutation } from '@queries/useSignInMutation';
import cn from '@utils/cn';
import { useForm } from 'react-hook-form';

function SignInForm() {
  const router = useRouter();
  const { mutateAsync: signIn, isPending } = useSignInMutation();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormSchemaType) => {
    const result = await signIn(data);

    if (result.error) {
      setError('password', {
        type: 'manual',
        message: '이메일과 비밀번호를 확인해주세요',
      });
      return;
    }

    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span>
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" {...register('email')} className="border border-slate-400 rounded-sm" />
        </span>
        {errors.email?.message && <span className="text-xs text-red-500">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <span>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="border border-slate-400 rounded-sm"
          />
        </span>
        {errors.password?.message && <span className="text-xs text-red-500">{errors.password.message}</span>}
      </div>

      <button
        type="submit"
        className={cn('mt-4 bg-blue-500 text-white px-4 py-2 rounded-md', [{ 'opacity-50': isPending }])}
        disabled={isPending}
      >
        로그인
      </button>
    </form>
  );
}

export default SignInForm;
