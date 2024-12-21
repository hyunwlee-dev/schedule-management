import { useRouter } from 'next/navigation';

import { type ScheduleRowInsert, type ScheduleRowUpdate, createSchedule, updateSchedule } from '@actions/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (schedule: ScheduleRowInsert) => createSchedule(schedule),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedules'],
      });
      router.back();
    },
  });
};

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (schedule: ScheduleRowUpdate) => updateSchedule(schedule),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedules'],
      });
      router.back();
    },
  });
};
