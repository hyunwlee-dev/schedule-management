import { ScheduleRow } from '@actions/schedule';
import Input from '@components/commons/input/Input';
import { COLORS_MAP, SCHEDULE_DATE_FORMAT } from '@constants/schedule';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateScheduleMutation, useUpdateScheduleMutation } from '@queries/useScheduleMutation';
import cn from '@utils/cn';
import dayjs from 'dayjs';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import ColorRadio from './ColorRadio';

const DEFAULT_TYPE = 'create';
const DEFAULT_COLOR = '에메랄드 그린';

const scheduleSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요.'),
    name: z.string().min(1, '이름을 입력해주세요.'),
    startAt: z.string().min(1, '시작일을 선택해주세요.'),
    endAt: z.string().min(1, '종료일을 선택해주세요.'),
    color: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.startAt > val.endAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['startAt'],
        message: '시작일은 종료일 이전으로 설정해주세요.',
      });
    }
  });

export type ScheduleFormProps = {
  type?: 'create' | 'update';
  schedule?: ScheduleRow;
};

function ScheduleForm({ type = DEFAULT_TYPE, schedule }: ScheduleFormProps) {
  const { mutateAsync: createSchedule } = useCreateScheduleMutation();
  const { mutateAsync: updateSchedule } = useUpdateScheduleMutation();
  const methods = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues:
      type === 'create'
        ? {
            title: '',
            name: '',
            startAt: '',
            endAt: '',
            color: COLORS_MAP[DEFAULT_COLOR],
          }
        : {
            ...schedule,
            startAt: dayjs(schedule?.start_at).format(SCHEDULE_DATE_FORMAT),
            endAt: dayjs(schedule?.end_at).format(SCHEDULE_DATE_FORMAT),
          },
  });

  const onCreateSubmit = async ({ title, name, startAt, endAt, color }: z.infer<typeof scheduleSchema>) => {
    const parsedData = {
      title,
      name,
      start_at: startAt,
      end_at: endAt,
      color,
    };

    await createSchedule(parsedData);
  };

  const onUpdateSubmit = async ({ title, name, startAt, endAt, color }: z.infer<typeof scheduleSchema>) => {
    const parsedData = {
      title,
      name,
      id: schedule?.id,
      start_at: startAt,
      end_at: endAt,
      color,
    };
    await updateSchedule(parsedData);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(type === 'create' ? onCreateSubmit : onUpdateSubmit)}
        className="my-4 flex flex-col gap-4 border border-slate-100 py-3 px-6 shadow-lg rounded-lg"
      >
        <div className="flex flex-col gap-1">
          <Input
            label="이름"
            inputProps={{
              ...methods.register('name'),
            }}
          />
          {methods.formState.errors.name?.message && (
            <span className="text-xs text-red-500">{methods.formState.errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="제목"
            inputProps={{
              ...methods.register('title'),
            }}
          />
          {methods.formState.errors.title?.message && (
            <span className="text-xs text-red-500">{methods.formState.errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="시작"
            inputProps={{
              type: 'date',
              ...methods.register('startAt'),
            }}
          />
          {methods.formState.errors.startAt?.message && (
            <span className="text-xs text-red-500">{methods.formState.errors.startAt.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="종료"
            inputProps={{
              type: 'date',
              ...methods.register('endAt'),
            }}
          />
          {methods.formState.errors.endAt?.message && (
            <span className="text-xs text-red-500">{methods.formState.errors.endAt.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="color" className="text-xs text-slate-600 font-medium">
            색상
          </label>
          <ColorRadio
            defaultValue={type === 'update' && !!schedule ? schedule?.color : COLORS_MAP[DEFAULT_COLOR]}
            name="color"
          />
          {methods.formState.errors.color?.message && (
            <span className="text-xs text-red-500">{methods.formState.errors.color.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={cn('border bg-blue-500 text-white px-5 py-2 text-lg font-medium rounded-md', [
            { 'bg-orange-300': type === 'update' },
          ])}
        >
          {type === 'create' ? '추가' : '일괄 수정'}
        </button>
      </form>
    </FormProvider>
  );
}

export default ScheduleForm;
