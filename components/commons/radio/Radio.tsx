import { InputHTMLAttributes, PropsWithChildren, forwardRef } from 'react';

import { CheckIcon } from '@heroicons/react/24/solid';
import cn from '@utils/cn';

import { RadioProvider, useRadioContext } from './RadioProvider';

function Radio({ defaultValue, children }: PropsWithChildren<{ defaultValue: string }>) {
  return <RadioProvider defaultValue={defaultValue}>{children}</RadioProvider>;
}

const RadioGroup = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <fieldset className={cn('flex flex-col gap-4', className)}>{children}</fieldset>;
};

RadioGroup.displayName = 'RadioGroup';
Radio.Group = RadioGroup;

type RadioOptionProps = {
  value: string;
  name: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const RadioOption = forwardRef<HTMLInputElement, PropsWithChildren<RadioOptionProps>>(
  ({ value, children, className, ...props }, ref) => {
    const { value: selectedValue, handleChange } = useRadioContext();

    const isChecked = selectedValue === value;

    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="radio"
          value={value}
          checked={isChecked}
          onChange={(e) => {
            handleChange(value);
            props.onChange?.(e);
          }}
          name={props.name}
          className="sr-only"
        />
        <div className="size-4">{isChecked && <CheckIcon className="size-4 text-slate-600" />}</div>
        <span className={cn('text-slate-600 flex items-center gap-1', className)}>{children}</span>
      </label>
    );
  },
);

RadioOption.displayName = 'RadioOption';
Radio.Option = RadioOption;

export default Radio;
