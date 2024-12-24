import Link from 'next/link';

import SignInForm from '@components/auth/SignInForm';

function LoginPage() {
  return (
    <section className="flex flex-col gap-8 mt-32">
      <h2 className="text-2xl">로그인</h2>
      <SignInForm />
      <Link href="/sign-up" className="block text-center items-center underline-offset-2 underline text-blue-500">
        회원가입하러 가기
      </Link>
    </section>
  );
}

export default LoginPage;
