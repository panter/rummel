import { Input, InputProps } from 'antd';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  BaseFormInputProps,
  FormInputController,
  formBaseInputProps,
} from './FormInputController';
import { NumberInput, NumberInputProps } from './NumberInput';

type NumberFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  inputProps?: NumberInputProps;
  readOnly?: boolean;
  disabled?: boolean;
};

export function NumberFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
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
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
    />
  );
}
