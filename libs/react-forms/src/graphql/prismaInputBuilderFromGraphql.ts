import { TypedDocumentNode } from '@apollo/client';
import { InferSchema, prismaSchemaBuilder } from '@panter/prisma-inputs';

export type ExtractDataFromMutation<T> =
  T extends TypedDocumentNode<unknown, infer TVariables>
    ? ExtractDataFromMutationVariable<TVariables>
    : never;

type ExtractDataFromMutationVariable<TVariable> = TVariable extends {
  data: infer TData;
}
  ? TData
  : never;

export type ExtractTypeFromFragment<T> =
  T extends TypedDocumentNode<infer Type, unknown> ? Type : never;

export type ExtractPropertyTypeFromFragment<
  T,
  Key extends keyof NonNullable<ExtractTypeFromFragment<T>>,
> =
  T extends TypedDocumentNode<infer U>
    ? Key extends keyof NonNullable<U>
      ? NonNullable<NonNullable<U>[Key]> extends Array<any>
        ? NonNullable<NonNullable<U>[Key]>[number]
        : NonNullable<NonNullable<U>[Key]>
      : never
    : never;

export type ExtractRelationInputType<
  T,
  K extends keyof ExtractDataFromMutation<T>,
  RelationKey extends keyof NonNullable<ExtractDataFromMutation<T>[K]> &
    ('create' | 'update'),
  Input extends NonNullable<
    ExtractDataFromMutation<T>[K]
  >[RelationKey] = NonNullable<ExtractDataFromMutation<T>[K]>[RelationKey],
> =
  Input extends Array<any>
    ? RelationKey extends 'create'
      ? NonNullable<Input[number]>
      : 'data' extends keyof NonNullable<Input[number]>
        ? NonNullable<NonNullable<Input[number]>['data']>
        : unknown
    : NonNullable<Input>;

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
