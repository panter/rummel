import {
  InferSchema,
  prismaSchemaBuilder,
  property,
} from '@panter/prisma-inputs';
import {
  MaterialsDepotTimelineCreateWithoutMaterialsDepotInput,
  MaterialsDepotTimelineUpdateInput,
} from '../../@generated/graphql';

export const materialsDepotTimelineSchema: InferSchema<
  MaterialsDepotTimelineCreateWithoutMaterialsDepotInput,
  MaterialsDepotTimelineUpdateInput
> = prismaSchemaBuilder<
  MaterialsDepotTimelineCreateWithoutMaterialsDepotInput,
  MaterialsDepotTimelineUpdateInput
>(() => ({
  props: {
    description: property(),
    startDate: property(),
    endDate: property(),
  },
  create: {} as any,
  update: {},
}));

if (!materialsDepotTimelineSchema.updateSchema) {
  throw new Error('MaterialsDepotTimeline updateSchema not defined');
}

if (!materialsDepotTimelineSchema.createSchema) {
  throw new Error('MaterialsDepotTimeline createSchema not defined');
}
