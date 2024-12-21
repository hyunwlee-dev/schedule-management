'use server';

import { getSchedules } from '@actions/schedule';
import CalendarBoard from '@components/calendar/CalendarBoard';
import { SCHEDULE_DATE_FORMAT } from '@constants/schedule';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getVisibleRangeDate } from '@utils/getVisibleRangeDate';
import dayjs from 'dayjs';

async function Home() {
  const queryClient = new QueryClient();

  const { firstVisibleDate, lastVisibleDate } = getVisibleRangeDate(
    dayjs().startOf('month').format(SCHEDULE_DATE_FORMAT),
  );

  await queryClient.prefetchQuery({
    queryKey: [
      'schedules',
      {
        startDate: firstVisibleDate.format(SCHEDULE_DATE_FORMAT),
        endDate: lastVisibleDate.format(SCHEDULE_DATE_FORMAT),
      },
    ],
    queryFn: () =>
      getSchedules({
        startDate: firstVisibleDate.format(SCHEDULE_DATE_FORMAT),
        endDate: lastVisibleDate.format(SCHEDULE_DATE_FORMAT),
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CalendarBoard />
    </HydrationBoundary>
  );
}

export default Home;
