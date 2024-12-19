async function DatePage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  return <div>{date}</div>;
}

export default DatePage;
