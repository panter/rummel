import {
  BaseFormInputProps,
  formBaseInputProps,
  FormInputController,
} from './FormInputController';
import { FieldPath, FieldValues } from 'react-hook-form';

import { Input } from 'antd';

const { TextArea } = Input;
type TextAreaFormInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  readOnly?: boolean;
  disabled?: boolean;
  rows?: number;
};

export function TextAreaFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  readOnly,
  disabled,
  rows,
  ...props
}: TextAreaFormInputProp<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);
  return (
    <FormInputController
      {...baseFormInputProps}
      render={({ field }) => (
        <TextArea
          rows={rows || 4}
          {...field}
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
    />
  );
}
