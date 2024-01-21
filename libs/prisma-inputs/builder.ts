import {
  InferPrismaModel,
  PrismaInput,
  PrismaInputSchema,
  PrismaInputSchemaProperties,
  object,
} from '.';

/**
 * Represents a type derived from `T` by excluding properties that are present in `U`.
 *
 * - `Difference` computes the set of keys that are in `T` but not in `U`.
 * - `ExcludeTypes` then picks only those keys from `T`, effectively excluding the properties that are shared with `U`.
 *
 * For example:
 * If `T` is `{ a: number, b: string }` and `U` is `{ b: string, c: boolean }`,
 * the resulting type would be `{ a: number }`.
 */
export type ExcludeTypes<T, U> = Pick<T, Difference<T, U>>;
type Difference<T, U> = Exclude<keyof T, keyof U>;

/**
 * Represents a type that recursively merges the shared properties of `T` and `U`.
 *
 * - If a property exists in both `T` and `U`, and both are arrays, the resulting property will be an array of merged types.
 * - If a property exists in both `T` and `U`, and both are readonly arrays, the resulting property will be a readonly array of merged types.
 * - If a property exists in both `T` and `U`, and both are objects (but not arrays), the resulting property will be a recursively merged object.
 * - For any other combination of properties in `T` and `U`, the property from `T` is used.
 *
 * Properties that do not exist in both `T` and `U` are excluded from the resulting type.
 */
export type DeepIntersect<T, U> = {
  [P in keyof T & keyof U]?: T[P] extends Array<infer TI>
    ? U[P] extends Array<infer UI>
      ? Array<DeepIntersect<TI, UI>>
      : T[P] | U[P]
    : T[P] extends ReadonlyArray<infer TI>
      ? U[P] extends ReadonlyArray<infer UI>
        ? ReadonlyArray<DeepIntersect<TI, UI>>
        : T[P] | U[P]
      : T[P] extends object
        ? U[P] extends object
          ? DeepIntersect<T[P], U[P]>
          : T[P] | U[P]
        : T[P] | U[P];
};

/**
 * Represents the inferred type returned by the `prismaSchemaBuilder` function.
 *
 * The `prismaSchemaBuilder` function is assumed to generate a schema based on two input types:
 * - `C` for the creation input.
 * - `U` for the update input.
 *
 * `InferSchema` captures the return type of this function, allowing for type-safe usage of the resulting schema.
 *
 * Usage:
 * If `prismaSchemaBuilder` returns a schema object based on the provided creation and update input types,
 * `InferSchema` will represent that schema object's type.
 */
export type InferSchema<C, U> = ReturnType<typeof prismaSchemaBuilder<C, U>>;

/**
 * Maps a given model to its corresponding input format using a provided Prisma input schema.
 *
 * @param schema - The Prisma input schema that defines how the model should be transformed.
 * @param value - The current model value to be mapped. Can be `null` or `undefined`.
 * @param oldValue - The previous model value, if any. Useful for differential mapping. Can be `null` or `undefined`.
 *
 * @returns The mapped input derived from the provided model and schema.
 *
 * Usage:
 * Given a Prisma model and its corresponding input schema, this function will transform the model
 * into the format expected by Prisma operations (e.g., create, update). It can also consider previous
 * model values for differential mapping.
 */
export const mapModelToInput = <T>(
  schema: PrismaInputSchema<T>,
  value?: InferPrismaModel<T> | null | undefined,
  oldValue?: InferPrismaModel<T> | null | undefined,
) => schema.mapper({ value, oldValue, mapper: schema });

/**
 * Constructs Prisma input schemas based on provided properties and optional create/update specifications.
 *
 * This builder function facilitates the creation of Prisma input schemas by allowing for the definition
 * of shared properties (union) and specific properties for creation and update operations.
 *
 * @param schemas - Configuration object containing:
 *   - `props`: Shared properties that are common for both create and update operations.
 *   - `create`: Optional properties specific to the creation operation. Can be set to `false` to exclude.
 *   - `update`: Optional properties specific to the update operation. Can be set to `false` to exclude.
 *
 * @returns An object containing:
 *   - `unionSchema`: A schema that merges the shared properties.
 *   - `createSchema`: A schema for the creation operation, if specified.
 *   - `updateSchema`: A schema for the update operation, if specified.
 *   - `relation`: A function to generate relation schemas, allowing for custom schema overrides.
 *
 * Usage:
 * Given a set of shared properties and optional create/update specific properties, this function
 * will generate Prisma input schemas suitable for various operations. It also provides a mechanism
 * to generate relation schemas with the option to override using custom schemas.
 */
export const prismaSchemaBuilder = <
  CreateInput,
  UpdateInput,
  PrismaUnionInput extends DeepIntersect<
    PrismaInput<CreateInput>,
    PrismaInput<UpdateInput>
  > = DeepIntersect<PrismaInput<CreateInput>, PrismaInput<UpdateInput>>,
  PrismaCreateInput = PrismaInput<CreateInput>,
  PrismaUpdateInput = PrismaInput<UpdateInput>,
>(schemas: {
  props: PrismaInputSchemaProperties<PrismaUnionInput>;
  create?:
    | PrismaInputSchemaProperties<
        ExcludeTypes<PrismaCreateInput, PrismaUnionInput>
      >
    | false;
  update?:
    | PrismaInputSchemaProperties<
        ExcludeTypes<PrismaUpdateInput, PrismaUnionInput>
      >
    | false;
}): {
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
  const { props, create, update } = schemas;

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
    create?: () => PrismaInputSchema<PrismaCreateInput>;
    update?: () => PrismaInputSchema<PrismaUpdateInput>;
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
