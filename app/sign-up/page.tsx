import SignUpForm from '@components/auth/SignUpForm';

function SignUpPage() {
  return (
    <section className="flex flex-col gap-8 mt-32">
      <h2 className="text-2xl">회원가입</h2>
      <SignUpForm />
    </section>
  );
}

export default SignUpPage;
