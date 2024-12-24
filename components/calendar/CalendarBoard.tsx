'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { COLORS_MAP, SCHEDULE_DATE_FORMAT } from '@constants/schedule';
import { useSchedulesQuery } from '@queries/useSchedulesQuery';
import cn from '@utils/cn';
import { getVisibleRangeDate } from '@utils/getVisibleRangeDate';
import dayjs from 'dayjs';
import Calendar, { type OnArgs, type TileArgs } from 'react-calendar';

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

  const [markDate, setMarkDate] = useState<{ id: number; weekMid: string }[]>([]);

  const { data: schedules } = useSchedulesQuery(dateRange);

  /**
   *  @description startDate와 endDate 사이의 날짜를 반환해주는 함수
   */
  const getMiddleDate = (startDate: string, endDate: string) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const daysDiff = end.diff(start, 'days');
    const middleDate = start.add(Math.floor(daysDiff / 2), 'days');

    return middleDate.format(SCHEDULE_DATE_FORMAT);
  };

  /**
   * @description 화면에 보여지는 월 달력에 각 주 시작/끝 날짜를 반환해주는 함수
   *  만약 dateRange.startAt === '2024-11-25' dateRange.endAt === '2024-01-05' 일때 반환값
   * [
   *   ['2024-11-25', '2024-12-01']
   *   ['2024-12-02', '2024-12-08']
   *   ['2024-12-09', '2024-12-15']
   *   ['2024-12-16', '2024-12-22']
   *   ['2024-12-23', '2024-12-29']
   *   ['2024-12-30', '2025-01-05']
   * ]
   */
  const getStartAndEndDatesWeekly = () => {
    const startDate = dayjs(dateRange.startDate);
    const endDate = dayjs(dateRange.endDate);

    const weeks = Math.ceil(endDate.diff(startDate, 'days') / 7);

    return Array.from({ length: weeks }, (_, index) => {
      const startOfWeek = startDate.add(index * 7, 'days');
      const endOfWeek = startOfWeek.add(6, 'days');
      const validEndDate = endOfWeek > endDate ? endDate : endOfWeek;

      return [startOfWeek.format(SCHEDULE_DATE_FORMAT), validEndDate.format(SCHEDULE_DATE_FORMAT)];
    });
  };

  /**
   *  @description 주어진 스케줄들에 대해, 각 주의 교차 범위 내 중간 날짜를 계산하여 마크된 날짜를 계산하는 함수입니다.
   *
   *  만약
   *
   *  schedule = {
   *    title: "개인프로젝트 끝내기",
   *    start_at: "2024-12-18",
   *    end_at: "2024-12-25"
   *    ...
   *  }
   *
   *  startAndEndDate = ["2024-12-23", "2024-12-29"] // 화면에 보여지는 2024-12 5주차
   *
   *  값이 있을때,
   *
   *  로직에 의해, rangeStart는 "2024-12-23", rangeEnd는 "2024-12-25"로 계산되고
   *  weekMid = getMiddleDate(rangeStart, rageEnd); // "2024-12-24"을 markData state에 값을 저장합니다.
   *
   *  결과적으로, "2024-12-23" ~ "2024-12-29"에 "개인프로젝트 끝내기"를 모두 표시하지 않고
   *  중앙 "2024-12-18"에 "개인프로젝트 끝내기 " 표시를 하기위해서 만들어진 함수입니다.
   */
  const getMiddleMarkDateWeekly = () => {
    const startAndEndDatesWeekly = getStartAndEndDatesWeekly();
    console.log('startAndEndDatesWeekly: ', startAndEndDatesWeekly);

    if (!schedules) return;

    const markDates = schedules.flatMap((schedule) => {
      const scheduleStart = dayjs(schedule.start_at).format(SCHEDULE_DATE_FORMAT);
      const scheduleEnd = dayjs(schedule.end_at).format(SCHEDULE_DATE_FORMAT);

      return startAndEndDatesWeekly
        .map(([weekStart, weekEnd]) => {
          const weekStartFormatted = dayjs(weekStart).format(SCHEDULE_DATE_FORMAT);
          const weekEndFormatted = dayjs(weekEnd).format(SCHEDULE_DATE_FORMAT);

          const rangeStart = scheduleStart >= weekStartFormatted ? scheduleStart : weekStartFormatted;
          const rangeEnd = scheduleEnd <= weekEndFormatted ? scheduleEnd : weekEndFormatted;

          // 문자열 비교
          if (rangeStart <= rangeEnd) {
            const weekMid = getMiddleDate(rangeStart, rangeEnd);

            return { id: schedule.id, weekMid: weekMid };
          }
          return null;
        })
        .filter((item) => item !== null);
    });

    setMarkDate((prev) => [...prev, ...markDates]);
  };

  useEffect(() => {
    getMiddleMarkDateWeekly();
  }, [schedules]);

  const titleContent = ({ date, view }: TileArgs) => {
    if (view !== 'month') return null;

    const formattedDate = dayjs(date).format(SCHEDULE_DATE_FORMAT);

    const matchingSchedules = schedules?.filter((schedule) => {
      const scheduleStart = dayjs(schedule.start_at).format(SCHEDULE_DATE_FORMAT);
      const scheduleEnd = dayjs(schedule.end_at).format(SCHEDULE_DATE_FORMAT);

      return formattedDate >= scheduleStart && formattedDate <= scheduleEnd;
    });

    return (
      <div className="min-h-16 text-xs">
        {matchingSchedules?.map((schedule) => {
          const matchingSchedule = markDate?.find((item) => item.id === schedule.id && item.weekMid === formattedDate);
          return (
            <p
              key={schedule.id}
              style={{ backgroundColor: schedule.color }}
              className={cn('w-full h-4 pl-1 text-center truncate text-black', [
                { 'mr-1': dayjs(schedule.end_at).format(SCHEDULE_DATE_FORMAT) === formattedDate },
                { 'text-white': schedule.color === COLORS_MAP['미드나잇 블랙'] },
                { 'text-white': schedule.color === COLORS_MAP['애플 레드'] },
                { 'text-white': schedule.color === COLORS_MAP['프렌치 로즈'] },
              ])}
            >
              {matchingSchedule ? schedule.title : ''}
            </p>
          );
        })}
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
