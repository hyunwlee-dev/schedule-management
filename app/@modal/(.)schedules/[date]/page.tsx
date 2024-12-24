import Modal from '@components/commons/layout/modal';
import SchedulesBoard from '@components/schedule/SchedulesBoard';

async function DateModal({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  return (
    <Modal>
      <SchedulesBoard date={date} />
    </Modal>
  );
}
export default DateModal;
