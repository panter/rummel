import {
  InferSchema,
  prismaSchemaBuilder,
  property,
} from '@panter/prisma-inputs';
import {
  DimensionRangeCreateWithoutSearchRequestInput,
  DimensionRangeUpdateInput,
} from '../../@generated/graphql';

// const resourceId = 'DimensionRange';
export const dimensionRangeSchema: InferSchema<
  DimensionRangeCreateWithoutSearchRequestInput,
  DimensionRangeUpdateInput
> = prismaSchemaBuilder<
  DimensionRangeCreateWithoutSearchRequestInput,
  DimensionRangeUpdateInput
>(() => ({
  props: {
    type: property(),
    minWidth: property(),
    maxWidth: property(),
    minHeight: property(),
    maxHeight: property(),
    minDepth: property(),
    maxDepth: property(),
  },
  create: {},
  update: {},
}));
