import { PropsWithChildren } from 'react';

import Radio from '@components/commons/radio/Radio';
import { COLORS_MAP } from '@constants/schedule';
import { useFormContext } from 'react-hook-form';

type ColorRadioProps = {
  defaultValue: string;
  name: string;
};

function ColorRadio({ defaultValue, name }: PropsWithChildren<ColorRadioProps>) {
  const { register } = useFormContext();
  const { ref, ...rest } = register(name);

  return (
    <Radio defaultValue={defaultValue}>
      <Radio.Group className="border border-slate-200 rounded-md p-3">
        {Object.entries(COLORS_MAP).map(([key, value]) => (
          <Radio.Option key={key} value={value} ref={ref} {...rest}>
            <div className="size-2 rounded-full" style={{ backgroundColor: value }} />
            <div>{key}</div>
          </Radio.Option>
        ))}
      </Radio.Group>
    </Radio>
  );
}

ColorRadio.displayName = 'ColorRadio';
export default ColorRadio;
