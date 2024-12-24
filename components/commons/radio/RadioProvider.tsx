'use client';

import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

type RadioContextType = {
  value?: string;
  handleChange: (value: string) => void;
};

const RadioContext = createContext<RadioContextType>({
  value: undefined,
  handleChange: () => {},
});

export const RadioProvider = ({
  children,
  defaultValue,
}: PropsWithChildren<{
  defaultValue?: string;
  disabled?: boolean;
}>) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return <RadioContext.Provider value={{ value, handleChange }}>{children}</RadioContext.Provider>;
};

export const useRadioContext = () => useContext(RadioContext);
