import {
  BaseFormInputProps,
  FormInputController,
  formBaseInputProps,
} from './FormInputController';
import { FieldPath, FieldValues } from 'react-hook-form';
import { Input, InputProps } from 'antd';

type TextFormInputProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  inputProps?: InputProps;
  type?: InputProps['type'];
  readOnly?: boolean;
  disabled?: boolean;
  autoComplete?: string;
};

export function TextFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  formItem,
  type,
  readOnly,
  disabled,
  ...props
}: TextFormInputProp<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);

  return (
    <FormInputController
      {...baseFormInputProps}
      {...formItem?.(props.name)}
      render={({ field }) => (
        <Input
          autoComplete="off"
          {...inputProps}
          {...field}
          type={type}
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
    />
  );
}
