'use client';

import { useState } from 'react';

import Input from '@components/commons/input/Input';
import { CheckIcon, EyeIcon } from '@heroicons/react/24/solid';
import cn from '@utils/cn';
import { FieldValues, Path, PathValue, useController, useFormContext } from 'react-hook-form';

const 영어_포함 = /[a-zA-Z]/;
const 숫자_포함 = /[0-9]/;
const 특수문자_포함 = /[!@#$%^&*(),.?":{}|<>]/;

type NewPasswordFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  validPasswordName: Path<TFieldValues>;
  label?: string;
};

function NewPasswordField<TFieldValues extends FieldValues>({
  name,
  validPasswordName,
  label = '새 비밀번호',
}: NewPasswordFieldProps<TFieldValues>) {
  const [isVisible, setIsVisible] = useState(false);
  const { control, setError, getValues } = useFormContext<TFieldValues>();
  const { field, fieldState } = useController<TFieldValues>({
    name,
    control,
    defaultValue: '' as PathValue<TFieldValues, Path<TFieldValues>>,
  });

  const isOver8 = field.value?.length >= 8;
  const hasEnglish = 영어_포함.test(field.value);
  const hasNumber = 숫자_포함.test(field.value);
  const hasSpecial = 특수문자_포함.test(field.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    field.onChange(newValue);
    if (!validPasswordName) return;

    const isValidPasswordDirty = control.getFieldState(validPasswordName)?.isDirty;
    const isPasswordMatch = getValues(validPasswordName) === newValue;

    if (!isPasswordMatch && isValidPasswordDirty) {
      setError(validPasswordName, {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    if (isPasswordMatch && isValidPasswordDirty) {
      setError(validPasswordName, {
        type: 'success',
        message: '',
      });
    }
  };

  const handleToVisible = () => setIsVisible(true);
  const handleToInvisible = () => setIsVisible(false);

  return (
    <div>
      <label className="text-xs font-medium text-slate-600">{label}</label>
      <Input
        trailingIcon={
          <EyeIcon
            onMouseDown={handleToVisible}
            onMouseUp={handleToInvisible}
            onMouseLeave={handleToInvisible}
            className={cn('size-5 cursor-pointer text-slate-300', {
              'text-slate-600': isVisible,
            })}
          />
        }
        inputProps={{
          ...field,
          value: field.value || '',
          type: isVisible ? 'text' : 'password',
          placeholder: `${label}를 입력해주세요.`,
          className: cn('border rounded-md px-3 py-2', {
            'border-red-500': fieldState.error?.type === 'manual',
            'border-emerald-500': fieldState.error?.type === 'success',
          }),
          onChange: handleChange,
        }}
      />
      <div className="text-Txt-Disabled flex flex-row flex-wrap gap-2 text-xs">
        <ValidationItem isValid={isOver8} label="최소 8자리" />
        <ValidationItem isValid={hasEnglish} label="영문자 포함" />
        <ValidationItem isValid={hasNumber} label="숫자 포함" />
        <ValidationItem isValid={hasSpecial} label="특수문자 입력" />
      </div>
      {fieldState.error?.message && <p className="text-red-500 text-xs">{fieldState.error.message}</p>}
    </div>
  );
}

type ValidationItemProps = {
  isValid: boolean;
  label: string;
};

function ValidationItem({ isValid, label }: ValidationItemProps) {
  return (
    <span
      className={cn('flex flex-row items-center gap-1 font-medium text-slate-400', {
        'text-emerald-400': isValid,
        'text-slate-400': !isValid,
      })}
    >
      <CheckIcon className="size-3" />
      {label}
    </span>
  );
}

export default NewPasswordField;
