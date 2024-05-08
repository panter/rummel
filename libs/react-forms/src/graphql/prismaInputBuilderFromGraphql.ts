import { TypedDocumentNode } from '@apollo/client';
import { InferSchema, prismaSchemaBuilder } from '@panter/prisma-inputs';

type ExtractDataFromMutation<T> =
  T extends TypedDocumentNode<unknown, infer TVariables>
    ? ExtractDataFromMutationVariable<TVariables>
    : never;

type ExtractDataFromMutationVariable<TVariable> = TVariable extends {
  data: infer TData;
}
  ? TData
  : never;

type ExtractTypeFromFragment<T> =
  T extends TypedDocumentNode<infer Type, unknown> ? Type : never;

export type PrismaSchemaFromGraphql<Create, Update, Fragment> = InferSchema<
  ExtractDataFromMutation<Create>,
  ExtractDataFromMutation<Update>,
  ExtractTypeFromFragment<Fragment>
>;

export const prismaInputBuilderFromGraphql = <
  CData,
  CVariables,
  UData,
  UVariables,
  FData,
>(props: {
  fragment: TypedDocumentNode<FData, any>;
  create?: TypedDocumentNode<CData, CVariables>;
  update?: TypedDocumentNode<UData, UVariables>;
}) => {
  return prismaSchemaBuilder<
    ExtractDataFromMutationVariable<CVariables>,
    ExtractDataFromMutationVariable<UVariables>,
    FData
  >;
};

export type ExtractFragmentType<T> =
  T extends TypedDocumentNode<infer U> ? U : never;
