import { redirect } from 'next/navigation';

import { getSession } from '@actions/auth';
import ChattingRoom from '@components/chatting/ChattingRoom';
import PeopleList from '@components/chatting/PeopleList';

async function LiveChattingPage() {
  const session = await getSession();
  if (!session) redirect('/login/check-point');

  return (
    <section className="w-full h-auto flex justify-between">
      <PeopleList loggedInUser={session.user} />
      <ChattingRoom />
    </section>
  );
}

export default LiveChattingPage;
