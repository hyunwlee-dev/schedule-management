'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Calendar from 'react-calendar';

import './calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const SCHEDULE_DATE_FORMAT = 'YYYY-MM-DD';

function CalendarBoard() {
  const router = useRouter();
  const [date, setDate] = useState<Value>(new Date());

  const handleDate = (value: Value) => {
    router.push(`/schedules/${dayjs(value?.toString()).format(SCHEDULE_DATE_FORMAT)}`);
    setDate(value);
  };

  return <Calendar value={date} onChange={handleDate} />;
}

export default CalendarBoard;
