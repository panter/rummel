import {
  InferSchema,
  prismaSchemaBuilder,
  property,
} from '@panter/prisma-inputs';
import {
  DimensionCreateWithoutBuildingComponentInput,
  DimensionUpdateInput,
} from '../../@generated/graphql';

const resourceId = 'Dimension';

export const dimensionSchema: InferSchema<
  DimensionCreateWithoutBuildingComponentInput,
  DimensionUpdateInput
> = prismaSchemaBuilder<
  DimensionCreateWithoutBuildingComponentInput,
  DimensionUpdateInput
>(() => ({
  props: {
    type: property(),
    width: property(),
    height: property(),
    depth: property(),
    isExact: property(),
  },
  create: {},
  update: {},
}));
