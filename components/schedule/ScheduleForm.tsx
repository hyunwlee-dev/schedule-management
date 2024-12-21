import React from 'react';

import { ScheduleRow } from '@/actions/schedule';
import cn from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import z from 'zod';

const DEFAULT_TYPE = 'create';

const scheduleSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요.'),
    name: z.string().min(1, '이름을 입력해주세요.'),
    startAt: z.string().min(1, '시작일을 선택해주세요.'),
    endAt: z.string().min(1, '마감일을 선택해주세요.'),
  })
  .superRefine((val, ctx) => {
    if (val.startAt > val.endAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['startAt'],
        message: '시작일은 마감일 이전으로 설정해주세요.',
      });
    }
  });

export type ScheduleFormProps = {
  type?: 'create' | 'update';
  schedule?: ScheduleRow;
};

function ScheduleForm({ type = DEFAULT_TYPE, schedule }: ScheduleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues:
      type === 'create'
        ? {
            title: '',
            name: '',
            startAt: '',
            endAt: '',
          }
        : {
            ...schedule,
            startAt: dayjs(schedule?.start_at).format('YYYY-MM-DD'),
            endAt: dayjs(schedule?.end_at).format('YYYY-MM-DD'),
          },
  });

  const onCreateSubmit = async (data: z.infer<typeof scheduleSchema>) => {
    console.log('create data: ', JSON.stringify(data));
  };

  const onUpdateSubmit = async (data: z.infer<typeof scheduleSchema>) => {
    console.log('updated data: ', JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleSubmit(type === 'create' ? onCreateSubmit : onUpdateSubmit)}
      className="mt-8 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <span>
          <label htmlFor="name">이름</label>
          <input id="name" type="name" {...register('name')} className="border border-slate-400 rounded-sm" />
        </span>
        {errors.name?.message && <span className="text-xs text-red-500">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <span>
          <label htmlFor="title">제목</label>
          <input id="title" type="title" {...register('title')} className="border border-slate-400 rounded-sm" />
        </span>
        {errors.title?.message && <span className="text-xs text-red-500">{errors.title.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <span>
          <label htmlFor="startAt">시작 날짜</label>
          <input id="startAt" type="date" {...register('startAt')} className="border border-slate-400 rounded-sm" />
        </span>
        {errors.startAt?.message && <span className="text-xs text-red-500">{errors.startAt.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <span>
          <label htmlFor="endAt">마감 날짜</label>
          <input id="endAt" type="date" {...register('endAt')} className="border border-slate-400 rounded-sm" />
        </span>
        {errors.endAt?.message && <span className="text-xs text-red-500">{errors.endAt.message}</span>}
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
  );
}

export default ScheduleForm;
