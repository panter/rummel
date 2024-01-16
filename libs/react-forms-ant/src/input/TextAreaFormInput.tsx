import {
  BaseFormInputProps,
  formBaseInputProps,
  FormInputController,
} from './FormInputController';
import { FieldPath, FieldValues } from 'react-hook-form';
import { TextAreaProps } from 'antd/es/input/TextArea';
import { Input } from 'antd';

const { TextArea } = Input;
type TextAreaFormInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  readOnly?: boolean;
  disabled?: boolean;
  rows?: number;
  inputProps: TextAreaProps;
};

export function TextAreaFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  readOnly,
  disabled,
  rows,
  inputProps,
  ...props
}: TextAreaFormInputProp<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);
  return (
    <FormInputController
      {...baseFormInputProps}
      render={({ field }) => (
        <TextArea
          rows={rows || 4}
          {...inputProps}
          {...field}
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
    />
  );
}
