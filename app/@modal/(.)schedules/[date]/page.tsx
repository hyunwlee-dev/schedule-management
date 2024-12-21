import SchedulesBoard from '@components/schedule/SchedulesBoard';

import Modal from './Modal';

async function DateModal({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  return (
    <Modal>
      <SchedulesBoard date={date} />
    </Modal>
  );
}
export default DateModal;
