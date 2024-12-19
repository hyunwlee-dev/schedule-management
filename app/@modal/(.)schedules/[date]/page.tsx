import Modal from './Modal';

async function DateModal({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  return <Modal>{date}</Modal>;
}
export default DateModal;
