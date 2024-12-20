// import Link from 'next/link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

async function Home() {
  // const dates = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <main>
      <h1 className="text-xl">스케줄 일정 관리</h1>
      <Calendar />
    </main>
  );
}

export default Home;
