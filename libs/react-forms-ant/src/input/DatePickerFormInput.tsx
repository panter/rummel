import { DatePicker, DatePickerProps } from 'antd';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  BaseFormInputProps,
  formBaseInputProps,
  FormInputController,
} from './FormInputController';
import dayjs from 'dayjs';

type DatePickerFormInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  datePickerProps?: DatePickerProps;
  readOnly?: boolean;
  disabled?: boolean;
  dateFormat?: string;
};

export function DatePickerFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  datePickerProps,
  formItem,
  readOnly,
  dateFormat = 'DD.MM.YYYY',
  disabled,
  ...props
}: DatePickerFormInputProp<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);

  return (
    <FormInputController
      {...baseFormInputProps}
      {...formItem?.(props.name)}
      render={({ field }) => (
        <DatePicker
          {...datePickerProps}
          style={{ width: '100%', ...datePickerProps?.style }}
          {...field}
          value={field.value ? dayjs(field.value) : undefined}
          inputReadOnly={readOnly}
          disabled={disabled}
          format={dateFormat}
        />
      )}
    />
  );
}
