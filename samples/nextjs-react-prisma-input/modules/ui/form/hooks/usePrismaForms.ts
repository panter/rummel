import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import {
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

export type FormModelType = 'query' | 'mutation' | 'intersection';

type DeepIntersect<T, U> = {
  [P in keyof T & keyof U]?: T[P] extends infer TP
    ? U[P] extends infer UP
      ? TP extends Array<infer TI>
        ? UP extends Array<infer UI>
          ? Array<DeepIntersect<TI, UI>>
          : TP
        : TP extends ReadonlyArray<infer TI>
        ? UP extends ReadonlyArray<infer UI>
          ? ReadonlyArray<DeepIntersect<TI, UI>>
          : TP
        : TP extends object
        ? UP extends object
          ? DeepIntersect<TP, UP>
          : TP
        : T[P]
      : T[P]
    : T[P];
};

type PrismaInputFormModel<T> = InferPrismaModel<PrismaInputReferences<T> & T>;

type FormModel<F, I> = DeepIntersect<F, PrismaInputFormModel<I>>;

export type ExtractFormModel<T> = T extends PrismaFormProps<
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
  defaultValues?: DefaultValues<FModel & {}>;
  onQueryCompleted?: (data: QData) => void;
  queryDataToModel?: (
    data: QData,
    noDefaults?: boolean,
  ) => DefaultValues<FModel & {}> | undefined | null;
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
  // defaultValues,
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
    // defaultValues,
    skipQuery: Boolean(graphqlFormProps.skipQuery || !graphqlFormProps.query),
    queryDataToModel,
    modelToInput: (data, queryData) => {
      // "as any" thing goes here, we do trust in typescript
      // modelToInput will only map the fields that are in the schema

      const input = mapModelToInput(
        schema,
        data as any,
        queryData &&
          queryDataToModel &&
          (queryDataToModel(queryData, true) as any),
      );

      return input !== undefined && data !== undefined
        ? ({
            data: input,
            ...graphqlFormProps.queryVariables,
          } as any)
        : undefined;
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
    noDefaults?: boolean,
  ) => DefaultValues<FModel & {}> | undefined | null;
  defaultValues?: DefaultValues<FModel & {}>;
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
