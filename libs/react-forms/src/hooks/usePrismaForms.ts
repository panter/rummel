import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import {
  DeepIntersect,
  InferPrismaModel,
  PrismaInputArgs,
  PrismaInputReferences,
  PrismaInputSchema,
  mapModelToInput,
} from '@panter/prisma-inputs';
import { DefaultValues, FieldValues } from 'react-hook-form';
import {
  FormMutationOptions,
  FormQueryOptions,
  UseFormMutationProps,
  UseFormMutationReturn,
  UseFormQueryProps,
} from './useForms';
import { useGraphqlForm } from './useGraphqlForms';

type FormModelType = 'query' | 'mutation' | 'intersection';

type PrismaInputFormModel<T> = InferPrismaModel<PrismaInputReferences<T> & T>;

type FormModel<F, I> = DeepIntersect<F, PrismaInputFormModel<I>>;

export type ExtractFormModel<T> =
  T extends PrismaFormProps<
    infer QData,
    infer QVariables,
    infer MData,
    infer MVariables,
    infer FModel,
    infer SchemaInput
  >
    ? FModel
    : never;

export type ExtractUseFormReturn<T, U = never> = U extends never
  ? UseFormMutationReturn<ExtractFormModel<T>>
  : UseFormMutationReturn<ExtractFormModel<T> | ExtractFormModel<U>>;

export type PrismaFormProps<
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
  SchemaInput extends PrismaInputArgs<MVariables>,
> = {
  schema: PrismaInputSchema<SchemaInput>;
  queryVariables?: QVariables;
  defaultValues?: (
    model?: DefaultValues<FModel> | null,
    queryData?: QData,
  ) => DefaultValues<FModel & object> | undefined | null;
  onQueryCompleted?: (data?: QData) => void;
  queryDataToModel?: (
    data: QData,
  ) => DefaultValues<FModel & object> | undefined | null;
  modelToInput?: (p: {
    input?: PrismaInputArgs<MVariables>;
    queryVariables?: QVariables;
    model: FModel;
  }) => Promise<MVariables | undefined>;
} & Omit<UseFormQueryProps<QData, QVariables>, 'onCompleted' | 'variables'> &
  Omit<
    UseFormMutationProps<FModel, MData, MVariables>,
    'modelToInput' | 'defaultValues' | 'onCompleted'
  >;

export type UsePrismaFormReturn<
  FModel extends FieldValues,
  QData,
  QVariables extends OperationVariables,
  MData,
  MVariables extends OperationVariables,
> = {
  schema: PrismaInputSchema<PrismaInputArgs<MVariables>>;
  formQuery: FormQueryOptions<QData, QVariables>;
  formMutation: FormMutationOptions<FModel, MData, MVariables>;
};

/**
 * Utility hook that combines FormQuery, FormMutation and PrismInputs to keep everything
 * tight togheter.
 *
 */
export function usePrismaForm<
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData extends FieldValues,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
>({
  schema,
  queryDataToModel,
  modelToInput,
  defaultValues,
  ...graphqlFormProps
}: PrismaFormProps<
  QData,
  QVariables,
  MData,
  MVariables,
  FModel,
  PrismaInputArgs<MVariables>
>): UsePrismaFormReturn<FModel, QData, QVariables, MData, MVariables> {
  const graphqlFormOptions = useGraphqlForm({
    ...graphqlFormProps,
    defaultValues,
    skipQuery: Boolean(graphqlFormProps.skipQuery || !graphqlFormProps.query),
    queryDataToModel,
    modelToInput: (model, queryData) => {
      // "as any" thing goes here, we do trust in typescript
      // also 'modelToInput' will only map the fields that are in the schema

      const inputData = mapModelToInput(
        schema,
        model as any,
        queryData && queryDataToModel && (queryDataToModel(queryData) as any),
      );

      if (modelToInput) {
        return modelToInput({
          input: inputData,
          queryVariables: graphqlFormProps.queryVariables,
          model,
        });
      }

      return {
        data: inputData || {},
        ...graphqlFormProps.queryVariables,
      } as any;
    },
  });

  return {
    schema,
    ...graphqlFormOptions,
  };
}

export const prismaResource = <
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData,
  MVariables extends {
    data?: any;
  },
  FModel extends FieldValues,
  SchemaInput extends PrismaInputArgs<MVariables>,
  FModelMode extends FormModelType = 'intersection',
>({
  formModelType,
  ...graphqlSchemaFormProps
}: {
  formModelType?: FModelMode;
  mutation: TypedDocumentNode<MData, MVariables>;
  fragment: TypedDocumentNode<FModel>;
  queryDataToModel?: (
    data: QData,
  ) => DefaultValues<FModel & object> | undefined | null;
  defaultValues?: (
    model?: DefaultValues<FModel>,
    queryData?: QData,
  ) => DefaultValues<FModel & object> | undefined | null;
} & PrismaFormProps<
  QData extends FieldValues ? QData : any,
  QVariables,
  MData,
  MVariables,
  FModelMode extends 'query'
    ? FModel
    : FModelMode extends 'mutation'
      ? PrismaInputFormModel<PrismaInputArgs<MVariables>>
      : FormModel<FModel, PrismaInputArgs<MVariables>>,
  SchemaInput
>): {
  formModelType?: FModelMode;
} & PrismaFormProps<
  QData extends FieldValues ? QData : any,
  QVariables,
  MData,
  MVariables,
  FModelMode extends 'query'
    ? FModel
    : FModelMode extends 'mutation'
      ? PrismaInputFormModel<PrismaInputArgs<MVariables>>
      : FormModel<FModel, PrismaInputArgs<MVariables>>,
  SchemaInput
> => {
  return graphqlSchemaFormProps;
};
