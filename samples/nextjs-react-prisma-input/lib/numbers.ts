import { isNumber, isString, isUndefined } from 'lodash';

/**
 * How many digits are there?
 *
 */
export const numberOfDigits = (x: number) => {
  return x === 0
    ? 0
    : Math.round(
        Math.abs(Math.min(Math.log(x < 0 ? x * -1 : x) / Math.log(10), 0)),
      );
};

/**
 * Format number to max of digits if there are less, but dont round if there
 * are more digits than allowed.
 *
 */
export const formatToFillDigits = (v: number, maxDigits: number) => {
  const digits = numberOfDigits(v);
  return digits < maxDigits ? v.toFixed(maxDigits) : v.toString();
};

/**
 * Format string or number to a user friendly string
 *
 */
export const formatValue = ({
  value,
  round,
  digits,
  showNumberPrefix,
  thousandSeparator,
}: {
  value: string | number | readonly string[] | string[] | undefined | null;
  round?: boolean;
  digits?: number;
  showNumberPrefix?: boolean;
  thousandSeparator?: boolean;
}): string | undefined => {
  let displayValue: string | undefined;
  if (isNumber(value)) {
    if (round && !isUndefined(digits)) {
      displayValue = value.toFixed(digits);
    } else if (!isUndefined(digits)) {
      displayValue = formatToFillDigits(value, digits);
    } else {
      displayValue = value.toString();
    }

    if (showNumberPrefix && value > 0) {
      displayValue = `+${displayValue}`;
    }
  } else if (isString(value)) {
    displayValue = value;
  }

  if (displayValue && thousandSeparator) {
    displayValue = displayValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");
  }

  return displayValue;
};

export const formatPrice = (price: number) => {
  return `CHF ${formatValue({
    value: price,
    digits: 2,
    round: true,
    thousandSeparator: true,
  })}`;
};
