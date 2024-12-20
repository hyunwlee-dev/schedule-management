import { InputHTMLAttributes, useId } from 'react';

import { CheckCircleIcon } from '@heroicons/react/16/solid';
import cn from '@utils/cn';

type CheckboxButtonProps = {
  checked: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

function CheckboxInput({ checked, className, ...props }: CheckboxButtonProps) {
  const checkboxId = useId();
  return (
    <>
      <label className={cn('cursor-pointer', className)} htmlFor={checkboxId}>
        <CheckCircleIcon className={cn('text-slate-300 size-6', [{ 'text-slate-600': checked }])} />
      </label>
      <input id={checkboxId} className="sr-only" type="checkbox" {...props} />
    </>
  );
}

export default CheckboxInput;
