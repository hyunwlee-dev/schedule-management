'use client';

import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';

function SchedulesBoard({ date }: { date: string }) {
  return (
    <div>
      <h2 className="text-2xl text-center mt-4">{date}</h2>
      <ScheduleList date={date} className="flex flex-wrap gap-10" />
      <ScheduleForm />
    </div>
  );
}

export default SchedulesBoard;
