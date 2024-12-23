import Link from 'next/link';

import SignInForm from '@components/auth/SignInForm';

import Modal from './Modal';

async function LoginModal() {
  return (
    <Modal>
      <SignInForm />
      <Link href="/sign-up">회원가입</Link>
    </Modal>
  );
}
export default LoginModal;
