import {
  InferSchema,
  prismaSchemaBuilder,
  property,
} from '@panter/prisma-inputs';
import { TaskCreateInput, TaskUpdateInput } from '../../@generated/graphql';

export const taskSchema: InferSchema<TaskCreateInput, TaskUpdateInput> =
  prismaSchemaBuilder<TaskCreateInput, TaskUpdateInput>(() => ({
    props: {
      name: property(),
      dueDate: property(),
      closedAt: property(),
    },
    create: {} as any,
    update: {},
  }));

if (!taskSchema.updateSchema) {
  throw new Error('Task updateSchema not defined');
}

if (!taskSchema.createSchema) {
  throw new Error('Task createSchema not defined');
}
