import { Checkbox, CheckboxProps } from 'antd';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  BaseFormInputProps,
  formBaseInputProps,
  FormInputController,
} from './FormInputController';

type DateCheckboxFormInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  inputProps?: CheckboxProps;
  readOnly?: boolean;
  disabled?: boolean;
};

export function DateCheckboxFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  readOnly,
  disabled,
  ...props
}: DateCheckboxFormInputProp<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);
  return (
    <FormInputController
      {...baseFormInputProps}
      render={({ field: { onChange, value, ...field } }) => (
        <Checkbox
          {...inputProps}
          {...field}
          checked={value != null}
          onChange={(e) =>
            !readOnly && onChange(e.target.checked ? new Date() : null)
          }
          disabled={disabled}
        />
      )}
    />
  );
}
