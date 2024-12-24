import SignUpForm from '@components/auth/SignUpForm';
import Modal from '@components/commons/layout/modal';

async function SignUpModal() {
  return (
    <Modal>
      <h2 className="text-2xl">회원가입</h2>
      <SignUpForm className="mt-10" />
    </Modal>
  );
}
export default SignUpModal;
