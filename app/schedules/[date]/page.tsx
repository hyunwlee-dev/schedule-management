import SchedulesBoard from '@components/schedule/SchedulesBoard';

async function DatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  return (
    <section>
      <SchedulesBoard date={date} />
    </section>
  );
}
export default DatePage;
