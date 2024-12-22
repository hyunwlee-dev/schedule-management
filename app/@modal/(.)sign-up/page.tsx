import SignUpForm from '@components/auth/SignUpForm';

import Modal from './Modal';

async function LoginModal() {
  return (
    <Modal>
      <SignUpForm />
    </Modal>
  );
}
export default LoginModal;
