import {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { FormInput, FormInputLabel } from '../FormInput';

export const formBaseInputProps = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: BaseFormInputProps<TFieldValues, TName>,
) => {
  return {
    style: props.style,
    className: props.className,
    name: props.name,
    control: props.control,
    defaultValue: props.defaultValue,
    message: props.message,
    messageType: props.messageType,
    resourceId: props.resourceId,
    rules: props.rules,
    shouldUnregister: props.shouldUnregister,
    label: props.label,
    ...props?.formItem?.(props.name),
  };
};

export type MessageTypes = 'info' | 'error' | 'warning' | undefined;

export type BaseFormInputNoFormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<BaseFormInputProps<TFieldValues, TName>, 'formItemProps' | 'name'>;

export type BaseFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  style?: React.CSSProperties;
  className?: string;
  resourceId?: string;
  autoComplete?: string;
  label?: FormInputLabel;
  messageType?: MessageTypes;
  message?: React.ReactNode;
  formItem?: (name: TName) => BaseFormInputNoFormItemProps<TFieldValues, TName>;
};

type FormInputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
  style?: React.CSSProperties;
  className?: string;
  resourceId?: string;
  messageType?: MessageTypes;
  errorMessageType?: MessageTypes;
  message?: React.ReactNode;
  label?: FormInputLabel;
  render?: (p: {
    field: ControllerRenderProps<TFieldValues, TName>;
    resourceId?: string;
    name: TName;
    error?: FieldError;
  }) => React.ReactNode;
};

export function FormInputController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  style,
  className,
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
  resourceId,
  message,
  messageType,
  errorMessageType,
  label,
  render,
}: FormInputControllerProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister,
    rules,
  });

  const formInputMessageType =
    error?.type && errorMessageType ? errorMessageType : messageType;

  const formInputMessage = error?.message || message;
  return (
    <FormInput
      style={style}
      className={className}
      name={name}
      label={label}
      resourceId={resourceId}
      message={formInputMessage}
      messageKey={error?.type}
      messageType={formInputMessageType}
      required={rules?.required}
    >
      {render?.({ field, resourceId, name, error })}
    </FormInput>
  );
}
