import { Input, InputRef } from 'antd';
import React, { useState } from 'react';
import { isNaN, isNull, isString } from 'lodash';

import { formatValue } from '../../../../../lib/numbers';

/**
 * Transforms formatted input text to a number taking the `defaultNegative`
 * into account.
 *
 */
const transformTextToNumber = (
  value: string | null | undefined,
  defaultNegative?: boolean,
) => {
  if (value === '' || isNull(value)) {
    return null;
  } else if (isString(value)) {
    const internalNumber = Number(value.replace(',', '.').replace("'", ''));
    if (isNaN(internalNumber)) {
      return null;
    } else if (value.startsWith('+') || value.startsWith('-')) {
      return internalNumber;
    } else {
      if (defaultNegative) {
        return internalNumber * -1;
      } else {
        return internalNumber;
      }
    }
  }
  return undefined;
};

export type NumberInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix' | 'type' | 'onChange' | 'onBlur'
> & {
  onChange?: (value?: number | null) => void;
  onBlur?: (value?: number | null) => void;
  defaultNegative?: boolean;
  showNumberPrefix?: boolean;
  round?: boolean;
  digits?: number;
  autoComplete?: string;
};

export const NumberInput: React.FC<
  NumberInputProps & React.RefAttributes<InputRef>
> = ({
  value,
  onChange,
  onBlur,
  defaultNegative,
  showNumberPrefix,
  round,
  autoComplete = 'off',
  digits,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>();
  let displayValue: string | undefined = undefined;
  if (internalValue === undefined) {
    //user is not typing
    displayValue = formatValue({ value, round, digits, showNumberPrefix });
  } else {
    // user is typing
    displayValue = `${internalValue}`;
    if (internalValue === null || internalValue === undefined) {
      displayValue = '';
    }
  }

  const onInternalBlur = () => {
    const inputNumber = transformTextToNumber(internalValue, defaultNegative);
    if (inputNumber !== undefined) {
      onChange?.(inputNumber);
      onBlur && onBlur(inputNumber);
      setInternalValue(undefined);
    }
  };

  const onInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInternalValue(inputValue);

    const inputNumber = transformTextToNumber(inputValue, defaultNegative);
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
