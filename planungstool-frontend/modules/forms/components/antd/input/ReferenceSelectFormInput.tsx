import { Input, InputProps } from 'antd';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  BaseFormInputProps,
  FormInputController,
  formBaseInputProps,
} from './FormInputController';
import { ReferenceSelect, ReferenceSelectorProps } from './ReferenceSelect';
import { OperationVariables } from '@apollo/client';

type ReferenceSelectFormInputProp<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  Multi extends boolean,
  ManyData,
  ManyVariables extends OperationVariables,
  Result,
> = BaseFormInputProps<TFieldValues, TName> & {
  resourceId?: string;
  readOnly?: boolean;
  disabled?: boolean;
  selectProps: ReferenceSelectorProps<Multi, ManyData, ManyVariables, Result>;
};

export function ReferenceSelectFormInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  Multi extends boolean,
  ManyData,
  ManyVariables extends OperationVariables,
  Result,
>({
  resourceId,
  readOnly,
  disabled,
  selectProps,
  ...props
}: ReferenceSelectFormInputProp<
  TFieldValues,
  TName,
  Multi,
  ManyData,
  ManyVariables,
  Result
>) {
  const baseFormInputProps = formBaseInputProps(props);
  return (
    <FormInputController
      {...baseFormInputProps}
      render={({ field }) => (
        <ReferenceSelect
          {...selectProps}
          {...field}
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
    />
  );
}
