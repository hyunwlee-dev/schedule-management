import Link from 'next/link';

import SignInForm from '@components/auth/SignInForm';

import Modal from './Modal';

async function LoginModal() {
  return (
    <Modal>
      <h2 className="text-2xl">로그인</h2>
      <SignInForm className="mt-10" />
      <Link href="/sign-up" className="mt-4 block text-center items-center underline-offset-2 underline text-blue-500">
        회원가입하러 가기
      </Link>
    </Modal>
  );
}
export default LoginModal;
