import SignInForm from '@components/auth/SignInForm';

import Modal from './Modal';

async function LoginModal() {
  return (
    <Modal>
      <SignInForm />
    </Modal>
  );
}
export default LoginModal;
