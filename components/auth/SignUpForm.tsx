'use client';

import Input from '@components/commons/input/Input';
import { type SignUpFormSchemaType, signUpFormSchema } from '@constants/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import NewPasswordField from './NewPasswordField';
import ValidPasswordField from './ValidPasswordField';

function SignUpForm() {
  const methods = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      newPassword: '',
      validPassword: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormSchemaType> = async (data) => {
    console.log('Submitted:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium leading-4 -tracking-[0.5px] text-slate-600" htmlFor="email">
            이메일
          </label>
          <Input
            inputProps={{
              ...methods.register('email'),
              className: 'border rounded-md px-3 py-2',
            }}
          />
          {methods.formState.errors.email?.message && (
            <span className="text-xs text-red-500">{methods.formState.errors.email.message}</span>
          )}
        </div>
        <NewPasswordField name="newPassword" validPasswordName="validPassword" />
        <ValidPasswordField name="validPassword" newPasswordName="newPassword" />
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          회원가입
        </button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
