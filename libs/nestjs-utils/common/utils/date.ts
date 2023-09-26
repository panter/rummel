import * as dayjs from 'dayjs';

export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

export const isValidDate = (date: unknown): date is Date =>
  date != null &&
  (date instanceof Date ||
    date instanceof dayjs.Dayjs ||
    typeof date === 'string' ||
    typeof date === 'number') &&
  dayjs(date).isValid();

export const formatDate = (
  date: unknown,
  format = DEFAULT_DATE_FORMAT,
): string | undefined =>
  isValidDate(date) ? dayjs(date).format(format) : date?.toString();
