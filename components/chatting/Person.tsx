'use client';

import { UserCircleIcon } from '@heroicons/react/24/solid';
import cn from '@utils/cn';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

type PersonProps = {
  name: string;
  onChattingRoom: boolean;
  isActive: boolean;
  onClick?: () => void;
};

function Person({ name, onChattingRoom, isActive, onClick }: PersonProps) {
  return (
    <div
      className={cn('flex w-full gap-4 items-center p-4', [
        { 'bg-gray-50': onChattingRoom },
        { 'bg-gray-50': !onChattingRoom && !isActive },
        { 'bg-blue-50': !onChattingRoom && isActive },
        { 'cursor-pointer': onClick },
      ])}
      onClick={onClick}
    >
      <UserCircleIcon className="size-10 text-slate-500" />
      <p className="text-black font-bold text-lg">{name}</p>
    </div>
  );
}

export default Person;
