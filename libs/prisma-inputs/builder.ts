import {
  InferPrismaModel,
  PrismaInput,
  PrismaInputSchema,
  PrismaInputSchemaProperties,
  object,
} from '.';

type Difference<T, U> = Exclude<keyof T, keyof U>;

type ExcludeTypes<T, U> = Pick<T, Difference<T, U>>;

export type InferSchema<C, U> = ReturnType<typeof prismaSchemaBuilder<C, U>>;

export const modelToInput = <T>(
  schema: PrismaInputSchema<T>,
  value?: InferPrismaModel<T> | null | undefined,
  oldValue?: InferPrismaModel<T> | null | undefined,
) => schema.mapper({ value, oldValue, mapper: schema });

export const prismaSchemaBuilder = <
  CreateInput,
  UpdateInput,
  PrismaUnionInput extends PrismaInput<CreateInput | UpdateInput> = PrismaInput<
    CreateInput | UpdateInput
  >,
  PrismaCreateInput = PrismaInput<CreateInput>,
  PrismaUpdateInput = PrismaInput<UpdateInput>,
>(
  schemas: () => {
    props: PrismaInputSchemaProperties<PrismaUnionInput>;
    create:
      | PrismaInputSchemaProperties<
          ExcludeTypes<PrismaCreateInput, PrismaUnionInput>
        >
      | false;
    update?:
      | PrismaInputSchemaProperties<
          ExcludeTypes<PrismaUpdateInput, PrismaUnionInput>
        >
      | false;
  },
): {
  unionSchema: PrismaInputSchema<PrismaUnionInput>;
  createSchema?: PrismaInputSchema<PrismaCreateInput>;
  updateSchema?: PrismaInputSchema<PrismaUpdateInput>;
  relation: (
    customSchemas?:
      | {
          create: () => PrismaInputSchema<PrismaCreateInput>;
          update: () => PrismaInputSchema<PrismaUpdateInput>;
        }
      | undefined,
  ) => {
    create: () => PrismaInputSchema<PrismaCreateInput>;
    update: () => PrismaInputSchema<PrismaUpdateInput>;
  };
} => {
  const { props, create, update } = schemas();

  const unionSchema: PrismaInputSchema<PrismaUnionInput> = {
    mapper: object(),
    properties: props,
  } as any;

  const createSchema: PrismaInputSchema<PrismaCreateInput> | undefined =
    create &&
    ({
      mapper: object(),
      properties: {
        ...props,
        ...create,
      },
    } as any);

  const updateSchema: PrismaInputSchema<PrismaUpdateInput> | undefined =
    update &&
    ({
      mapper: object(),
      properties: {
        ...props,
        ...update,
      },
    } as any);

  const relation = (customSchemas?: {
    create: () => PrismaInputSchema<PrismaCreateInput>;
    update: () => PrismaInputSchema<PrismaUpdateInput>;
  }): {
    create: () => PrismaInputSchema<PrismaCreateInput>;
    update: () => PrismaInputSchema<PrismaUpdateInput>;
  } => ({
    create: customSchemas?.create
      ? customSchemas?.create
      : createSchema
      ? () => createSchema
      : (undefined as any as () => PrismaInputSchema<PrismaCreateInput>),
    update: customSchemas?.update
      ? customSchemas?.update
      : updateSchema
      ? () => updateSchema
      : (undefined as any as () => PrismaInputSchema<PrismaUpdateInput>),
  });

  return {
    unionSchema,
    createSchema,
    updateSchema,
    relation,
  };
};
