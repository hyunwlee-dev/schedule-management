'use server';

import type { Database } from '@/database.types';
import type { PostgrestError } from '@supabase/postgrest-js';
import { createClient } from '@utils/supabase/server';

export type ScheduleRow = Database['public']['Tables']['schedule']['Row'];
export type ScheduleRowInsert = Database['public']['Tables']['schedule']['Insert'];
export type ScheduleRowUpdate = Database['public']['Tables']['schedule']['Update'];

const handleError = (error: PostgrestError) => {
  console.error(error);
  //TODO: snackbar
  throw new Error(error.message);
};

export const getSchedules = async ({ startDate, endDate }: { startDate: string; endDate: string }) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedule')
    .select('*')
    .or(`and(start_at.lte.${endDate},end_at.gte.${startDate})`)
    .order('start_at', { ascending: true });

  if (error) handleError(error);

  return data;
};

export const createSchedule = async (schedule: ScheduleRowInsert) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('schedule').insert({
    ...schedule,
    created_at: new Date().toISOString(),
  });

  if (error) handleError(error);

  return data;
};

export const updateSchedule = async (schedule: ScheduleRowUpdate) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('schedule')
    .update({
      ...schedule,
      updated_at: new Date().toISOString(),
    })
    .eq('id', schedule.id as number);

  if (error) handleError(error);

  return data;
};
