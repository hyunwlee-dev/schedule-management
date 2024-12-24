'use client';

import { useState } from 'react';

import Input from '@components/commons/input/Input';
import { EyeIcon } from '@heroicons/react/24/solid';
import cn from '@utils/cn';
import { useController, useFormContext } from 'react-hook-form';

type FormValues = {
  newPassword: string;
  validPassword: string;
};

type ValidPasswordFieldProps = {
  name: keyof FormValues;
  newPasswordName: keyof FormValues;
  label?: string;
};

function ValidPasswordField({ name, newPasswordName, label = '비밀번호 확인' }: ValidPasswordFieldProps) {
  const { control, getValues, setError } = useFormContext<FormValues>();
  const { field, fieldState } = useController({ name, control, defaultValue: '' });
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    field.onChange(newValue);

    const isPasswordMatch = getValues(newPasswordName) === newValue;

    if (!isPasswordMatch) {
      setError(name, {
        type: 'manual',
        message: newValue.length > 0 ? '비밀번호가 일치하지 않습니다.' : '',
      });
    }

    if (isPasswordMatch) {
      setError(name, {
        type: 'success',
        message: '',
      });
    }
  };

  return (
    <div>
      <label className="text-xs font-medium text-slate-600">{label}</label>
      <Input
        trailingIcon={
          <EyeIcon
            onMouseDown={() => setIsVisible(true)}
            onMouseUp={() => setIsVisible(false)}
            onMouseLeave={() => setIsVisible(false)}
            className={cn('size-5 cursor-pointer text-slate-300', {
              'text-slate-600': isVisible,
            })}
          />
        }
        inputProps={{
          ...field,
          type: isVisible ? 'text' : 'password',
          placeholder: '비밀번호를 확인하세요',
          className: cn({
            'border-red-500': fieldState.error?.type === 'manual',
            'border-emerald-500': fieldState.error?.type === 'success',
          }),
          onChange: handleChange,
        }}
      />
      {fieldState.error?.message && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
    </div>
  );
}

export default ValidPasswordField;
