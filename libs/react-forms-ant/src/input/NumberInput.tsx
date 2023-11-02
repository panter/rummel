import { Input, InputRef } from 'antd';
import React, { useState } from 'react';
import { isNaN, isNull, isString } from 'lodash';

/**
 * Transforms formatted input text to a number taking the `defaultNegative`
 * into account.
 *
 */
const transformTextToNumber = (value: string | null | undefined) => {
  if (value === '' || isNull(value)) {
    return null;
  } else if (isString(value)) {
    const internalNumber = Number(value.replace(',', '.').replace("'", ''));
    if (isNaN(internalNumber)) {
      return null;
    } else {
      return internalNumber;
    }
  }
  return undefined;
};

export type NumberInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'size' | 'prefix' | 'type' | 'onChange' | 'onBlur'
> & {
  formatValue: (value?: number | string | null) => string | undefined;
  value?: number | string | null;
  onChange?: (value?: number | null) => void;
  onBlur?: (value?: number | null) => void;
  autoComplete?: string;
};

export const NumberInput: React.FC<
  NumberInputProps & React.RefAttributes<InputRef>
> = ({
  value,
  onChange,
  onBlur,
  formatValue,
  autoComplete = 'off',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>();
  let displayValue: string | undefined = undefined;
  if (internalValue === undefined) {
    //user is not typing
    displayValue = formatValue(value);
  } else {
    // user is typing
    displayValue = `${internalValue}`;
    if (internalValue === null || internalValue === undefined) {
      displayValue = '';
    }
  }

  const onInternalBlur = () => {
    const inputNumber = transformTextToNumber(internalValue);
    if (inputNumber !== undefined) {
      onChange?.(inputNumber);
      onBlur && onBlur(inputNumber);
      setInternalValue(undefined);
    }
  };

  const onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    setInternalValue(inputValue);

    const inputNumber = transformTextToNumber(inputValue);
    if (inputNumber) {
      // looks like we are ok, we can pass the value even we are still in edit mode
      onChange?.(inputNumber);
    }
  };
  return (
    <Input
      type="number"
      {...props}
      value={displayValue}
      onBlur={onInternalBlur}
      onChange={onInternalChange}
    />
  );
};
