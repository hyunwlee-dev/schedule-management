'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SCHEDULE_DATE_FORMAT } from '@constants/schedule';
import { useSchedulesQuery } from '@queries/useSchedulesQuery';
import { getVisibleRangeDate } from '@utils/getVisibleRangeDate';
import dayjs from 'dayjs';
import Calendar, { OnArgs, type TileArgs } from 'react-calendar';

import './calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarBoard() {
  const router = useRouter();
  const [pickedDate, setPickedDate] = useState<Value>(new Date());
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>(() => {
    const { firstVisibleDate, lastVisibleDate } = getVisibleRangeDate(
      dayjs().startOf('month').format(SCHEDULE_DATE_FORMAT),
    );
    return {
      startDate: firstVisibleDate.format(SCHEDULE_DATE_FORMAT),
      endDate: lastVisibleDate.format(SCHEDULE_DATE_FORMAT),
    };
  });

  const { data: schedules } = useSchedulesQuery(dateRange);

  const titleContent = ({ date, view }: TileArgs) => {
    if (view !== 'month') return null;

    const formattedDate = dayjs(date).format(SCHEDULE_DATE_FORMAT);

    const matchingSchedules = schedules?.filter((schedule) => {
      const scheduleStart = dayjs(schedule.start_at).format(SCHEDULE_DATE_FORMAT);
      const scheduleEnd = dayjs(schedule.end_at).format(SCHEDULE_DATE_FORMAT);

      return formattedDate >= scheduleStart && formattedDate <= scheduleEnd;
    });

    return (
      <div className="h-16 text-[10px] border border-slate-500 rounded-b-md">
        {matchingSchedules?.map((schedule) => (
          <p key={schedule.id} className="pl-1 text-start truncate">
            - {schedule.title}
          </p>
        ))}
      </div>
    );
  };

  const handleDate = (value: Value) => {
    router.push(`/schedules/${dayjs(value?.toString()).format(SCHEDULE_DATE_FORMAT)}`, { scroll: false });
    setPickedDate(value);
  };

  const onActiveStartDateChangeHandler = ({ activeStartDate, view }: OnArgs) => {
    if (view !== 'month') return;
    const { firstVisibleDate, lastVisibleDate } = getVisibleRangeDate(
      dayjs(activeStartDate).format(SCHEDULE_DATE_FORMAT),
    );
    setDateRange({
      startDate: firstVisibleDate.format(SCHEDULE_DATE_FORMAT),
      endDate: lastVisibleDate.format(SCHEDULE_DATE_FORMAT),
    });
  };

  return (
    <Calendar
      value={pickedDate}
      onChange={handleDate}
      tileContent={titleContent}
      onActiveStartDateChange={onActiveStartDateChangeHandler}
    />
  );
}

export default CalendarBoard;
