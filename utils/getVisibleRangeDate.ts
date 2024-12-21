import dayjs from 'dayjs';

/**
 * @description 해당 월의 시작과 끝이아닌 달력의 보이는 시작, 마지막 날짜 범위를 반환해주는 함수
 * @param startDateOfMonth 찾고자 하는 달의 시작 날짜
 * @returns [달력에 보이는 시작날짜, 마지막 날짜]
 */
export const getVisibleRangeDate = (startDateOfMonth: string) => {
  const startOfWeekOffset = (dayjs(startDateOfMonth).day() + 6) % 7;
  const firstVisibleDate = dayjs(startDateOfMonth).subtract(startOfWeekOffset, 'day');

  const endOfCurrentMonth = dayjs(startDateOfMonth).endOf('month');
  const endOfWeekOffset = (7 - endOfCurrentMonth.day() + 7) % 7;
  const lastVisibleDate = endOfCurrentMonth.add(endOfWeekOffset, 'day');

  return { firstVisibleDate, lastVisibleDate };
};
