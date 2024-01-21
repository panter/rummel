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

export type PrismaSchemaFromGraphql<Create, Update> = InferSchema<
  ExtractDataFromMutation<Create>,
  ExtractDataFromMutation<Update>
>;

export const prismaInputBuilderFromGraphql = <
  CData,
  CVariables,
  UData,
  UVariables,
>(props: {
  create?: TypedDocumentNode<CData, CVariables>;
  update?: TypedDocumentNode<UData, UVariables>;
}) => {
  return prismaSchemaBuilder<
    ExtractDataFromMutationVariable<CVariables>,
    ExtractDataFromMutationVariable<UVariables>
  >;
};
