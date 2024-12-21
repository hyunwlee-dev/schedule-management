'use client';

import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';

function SchedulesBoard({ date }: { date: string }) {
  return (
    <div>
      <h2>{date}</h2>
      <ScheduleList date={date} />
      <ScheduleForm />
    </div>
  );
}

export default SchedulesBoard;
