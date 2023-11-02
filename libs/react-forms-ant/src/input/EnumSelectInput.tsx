import { FieldPath, FieldValues } from 'react-hook-form';
import { EnumSelect, EnumSelectProps, Keys } from './EnumSelect';
import {
  BaseFormInputProps,
  formBaseInputProps,
  FormInputController,
} from './FormInputController';

type EnumSelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  inputProps?: Omit<EnumSelectProps, 'keys'>;
  keys: Keys;
  readOnly?: boolean;
  disabled?: boolean;
};

export function EnumSelectInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  keys,
  readOnly,
  disabled,
  ...props
}: EnumSelectInputProps<TFieldValues, TName>) {
  const baseFormInputProps = formBaseInputProps(props);
  return (
    <FormInputController
      {...baseFormInputProps}
      render={({ field }) => (
        <EnumSelect
          {...inputProps}
          {...field}
          keys={keys}
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
    />
  );
}
