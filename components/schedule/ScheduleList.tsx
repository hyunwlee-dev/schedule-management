import { useSchedulesQuery } from '@queries/useSchedulesQuery';

import ScheduleForm from './ScheduleForm';

function ScheduleList({ date, className }: { date: string; className?: string }) {
  const { data: schedules, isLoading } = useSchedulesQuery({ startDate: date, endDate: date });

  if (isLoading) return 'loading...';

  if (schedules?.length === 0) return <p className="mt-10 w-full text-center">데이터가 없습니다.</p>;
  return (
    <>
      <span className="mt-4 block text-right">{`총 ${schedules?.length}개의 데이터`}</span>
      <ul className={className}>
        {schedules?.map((schedule) => <ScheduleForm type="update" key={schedule.id} schedule={schedule} />)}
      </ul>
    </>
  );
}

export default ScheduleList;
