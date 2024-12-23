// NOTE: intercepted route가 무한 렌더링을 발생시켜서 새로운 페이지를 만들게 되었습니다.
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSession } from '@actions/auth';

// link - https://github.com/vercel/next.js/issues/61341
async function LoginCheckPointPage() {
  const session = await getSession();
  if (session) redirect('/live-chatting');

  return (
    <section>
      <h2>로그인이 필요합니다</h2>
      <Link href="/login">로그인 하러가기</Link>
    </section>
  );
}

export default LoginCheckPointPage;
