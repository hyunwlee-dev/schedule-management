import z from 'zod';

export const emailSchema = z
  .string()
  .min(1, { message: '이메일을 입력해주세요' })
  .max(50, { message: '이메일은 최대 50자까지 입력할 수 있어요' })
  .email('올바른 이메일 형식으로 입력해주세요');

export const passwordSchema = z.string().min(1, { message: '비밀번호를 입력해주세요' });

export const signInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpFormSchema = z
  .object({
    email: emailSchema,
    newPassword: z.string().min(1, { message: '새 비밀번호를 입력해주세요' }),
    validPassword: z.string().min(1, { message: '확인 비밀번호를 입력해주세요' }),
  })
  .refine(({ newPassword, validPassword }) => newPassword === validPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['validPassword'],
  });

export type SignInFormSchemaType = z.infer<typeof signInFormSchema>;
export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
