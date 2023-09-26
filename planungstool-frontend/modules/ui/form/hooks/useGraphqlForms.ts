import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import {
  InferPrismaModel,
  PrismaInputArgs,
  PrismaInputReferences,
  PrismaInputSchema,
  modelToInput,
} from '@panter/prisma-inputs';
import { DefaultValues, FieldValues } from 'react-hook-form';
import {
  FormMutationOptions,
  FormQueryOptions,
  UseFormMutationProps,
  UseFormMutationReturn,
  UseFormQueryProps,
  useFormMutation,
  useFormQuery,
} from './useForms';

export type GraphqlFormProps<
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
  FModel extends FieldValues = MVariables,
> = Omit<UseFormQueryProps<QData, QVariables>, 'onCompleted' | 'variables'> &
  Omit<
    UseFormMutationProps<FModel, MData, MVariables>,
    'modelToInput' | 'defaultValues' | 'onCompleted'
  > & {
    queryDataToModel?: (
      data: QData,
      noDefaults?: boolean,
    ) => DefaultValues<FModel> | undefined | null;
    onQueryCompleted?: (data: QData) => void;
    modelToInput: (data: FModel, queryData?: QData) => MVariables | undefined;
    queryVariables?: QVariables;
    defaultValues?: DefaultValues<FModel>;
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
    defaultValues: defaultValues,
    // defaultValues: defaultValues as DeepPartialUseForm<FModel>,
    options: mutationOptions,
    onClose,
  });

  // cro todo: reset query on close
  const formQuery = useFormQuery({
    query,
    variables: queryVariables,
    skipQuery,
    validateResult,
    onCompleted: (data) => {
      queryDataToModel &&
        formMutation.form.reset({
          ...((defaultValues || {}) as any),
          ...(queryDataToModel(data) || undefined),
        });
      onQueryCompleted?.(data);
    },
  });

  return {
    formQuery,
    formMutation,
  };
}
