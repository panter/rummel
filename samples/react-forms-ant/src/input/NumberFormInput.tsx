import { FieldPath, FieldValues } from 'react-hook-form';
import {
  BaseFormInputProps,
  FormInputController,
  formBaseInputProps,
} from './FormInputController';
import { NumberInput, NumberInputProps } from './NumberInput';

export type NumberFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  inputProps?: Omit<NumberInputProps, 'formatValue'>;
  formatValue: NumberInputProps['formatValue'];
  readOnly?: boolean;
  disabled?: boolean;
};

export function NumberFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  formatValue,
  inputProps,
  readOnly,
  disabled,
  ...props
}: NumberFormInputProps<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);
  return (
    <FormInputController
      {...baseFormInputProps}
      render={({ field }) => (
        <NumberInput
          {...inputProps}
          {...field}
          formatValue={formatValue}
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
    />
  );
}
