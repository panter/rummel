import { useCallback } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { BaseFormInputNoFormItemProps } from '../input/FormInputController';

export type UseFormMutationReturn<T extends FieldValues> = UseFormReturn<T> & {
  formItem: (name: Path<T>) => BaseFormInputNoFormItemProps<T>;
};

export function useFormItem<FModel extends FieldValues>({
  resourceId,
  form,
}: {
  resourceId?: string;
  form: UseFormReturn<FModel>;
}) {
  const formItem = useCallback(
    (
      name: Path<FModel>,
    ): BaseFormInputNoFormItemProps<FModel, Path<FModel>> => ({
      resourceId,
      control: form.control,
    }),
    [resourceId, form.control],
  );

  return formItem;
}
