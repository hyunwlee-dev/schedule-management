import { ReactNode, useId } from 'react';

import cn from '@utils/cn';

type InputProps = {
  required?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.Ref<HTMLInputElement>;
  };
  label?: string;
  invalid?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  buttonGroup?: ReactNode;
};

function Input({ required = false, inputProps, label, invalid, buttonGroup, leadingIcon, trailingIcon }: InputProps) {
  const inputId = useId();

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="text-xs text-slate-600 font-medium">
          {label}
          {required ? <span className="text-blue-500">*</span> : null}
        </label>
      ) : null}
      <div className="flex w-full items-end">
        <div className="relative flex-1">
          {leadingIcon ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">{leadingIcon}</div>
          ) : null}
          <input
            id={inputId}
            type={inputProps?.type || 'text'}
            {...inputProps}
            className={cn(
              'bg-white w-full',
              {
                'border-red-500': invalid,
                'pl-[10px]': leadingIcon,
                'pr-[10px]': trailingIcon,
              },
              inputProps?.className,
            )}
          />
          {trailingIcon ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">{trailingIcon}</div>
          ) : null}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">{buttonGroup}</div>
        </div>
      </div>
    </div>
  );
}

export default Input;
