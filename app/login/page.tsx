import Link from 'next/link';

import SignInForm from '@components/auth/SignInForm';

function LoginPage() {
  return (
    <section>
      <SignInForm />
      <Link href="/sign-up">실시간 채팅 회원가입</Link>
    </section>
  );
}

export default LoginPage;
