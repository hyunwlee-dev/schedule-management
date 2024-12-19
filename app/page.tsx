import Link from 'next/link';

async function Home() {
  const dates = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <main>
      <section className="cards-container">
        {dates.map(date => (
          <Link key={date} href={`/schedules/${date}`} passHref>
            {date}
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Home;
