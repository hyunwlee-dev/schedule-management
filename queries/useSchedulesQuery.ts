import { getSchedules } from '@actions/schedule';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useSchedulesQuery = (dateRange: { startDate: string; endDate: string }) => {
  return useQuery({
    queryKey: ['schedules', dateRange],
    queryFn: () => getSchedules(dateRange),
    placeholderData: keepPreviousData,
  });
};
