import { OperationVariables } from '@apollo/client';
import { DefaultValues, FieldValues } from 'react-hook-form';
import {
  FormMutationOptions,
  FormQueryOptions,
  UseFormMutationProps,
  UseFormQueryProps,
  useFormMutation,
  useFormQuery,
} from './useForms';

const isFunction = (obj: unknown): obj is (...args: any[]) => any =>
  obj instanceof Function;

export type GraphqlFormProps<
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
  FModel extends FieldValues = MVariables,
> = Omit<UseFormQueryProps<QData, QVariables>, 'onCompleted' | 'variables'> &
  Omit<
    UseFormMutationProps<FModel, MData, MVariables>,
    'modelToInput' | 'defaultValues'
  > & {
    queryDataToModel?: (
      data: QData,
    ) => DefaultValues<FModel> | undefined | null;
    onQueryCompleted?: (data?: QData) => void;
    modelToInput: (
      data: FModel,
      queryData?: QData,
    ) => Promise<MVariables | undefined>;
    queryVariables?: QVariables;
    defaultValues?:
      | DefaultValues<FModel>
      | ((
          model?: DefaultValues<FModel> | null,
          queryData?: QData,
        ) => DefaultValues<FModel> | undefined | null);
  };

export type UseGraphqlFormReturn<
  FModel extends FieldValues,
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
> = {
  formQuery: FormQueryOptions<QData, QVariables>;
  formMutation: FormMutationOptions<FModel, MData, MVariables>;
};

/**
 * Utility hook that combines FormQuery, FormMutation to keep everything
 * tight togheter.
 *
 */
export function useGraphqlForm<
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
  FModel extends FieldValues = MVariables,
>({
  query,
  queryVariables,
  skipQuery,
  validateResult,
  resourceId,
  mutation,
  onQueryCompleted,
  modelToInput,
  queryDataToModel,
  onClose,
  defaultValues,
  options: mutationOptions,
  sendEmptyVariables,
  mutationDataToModel,
}: GraphqlFormProps<
  QData,
  QVariables,
  MData,
  MVariables,
  FModel
>): UseGraphqlFormReturn<FModel, QData, QVariables, MData, MVariables> {
  const formMutation = useFormMutation({
    resourceId,
    mutation,
    modelToInput: (formModel) => modelToInput(formModel, formQuery.model),
    options: mutationOptions,
    onClose,
    sendEmptyVariables,
    mutationDataToModel,
  });

  // cro todo: reset query on close, now we use useEffect to call onCompleted
  // in useFormQuery
  const formQuery = useFormQuery({
    query,
    variables: queryVariables,
    skipQuery,
    validateResult,
    onCompleted: (data) => {
      const newModel = data && queryDataToModel?.(data);
      formMutation.form.reset({
        ...(newModel || ({} as any)),
        ...((isFunction(defaultValues)
          ? defaultValues(newModel, data)
          : defaultValues) || {}),
      });
      onQueryCompleted?.(data);
    },
  });

  return {
    formQuery,
    formMutation,
  };
}
