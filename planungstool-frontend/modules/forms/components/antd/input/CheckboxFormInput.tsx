import { Checkbox, CheckboxProps, Input, InputProps } from 'antd';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  BaseFormInputProps,
  FormInputController,
  formBaseInputProps,
} from './FormInputController';

type CheckboxFormInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  inputProps?: CheckboxProps;
  readOnly?: boolean;
  disabled?: boolean;
};

export function CheckboxFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  readOnly,
  disabled,
  ...props
}: CheckboxFormInputProp<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);
  return (
    <FormInputController
      {...baseFormInputProps}
      render={({ field: { onChange, value, ...field } }) => (
        <Checkbox
          {...inputProps}
          {...field}
          checked={value}
          onChange={(e) => !readOnly && onChange(e.target.checked)}
          disabled={disabled}
        />
      )}
    />
  );
}
