import { FieldValues, UseFormSetError } from 'react-hook-form';

export type OnSubmitWithProps<T extends FieldValues> = (
  data: T,
  setError?: UseFormSetError<T>,
  reset?: (data: T) => void,
) => void;
