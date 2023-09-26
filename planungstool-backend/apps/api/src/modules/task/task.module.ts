import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  TaskCreateOneResolver,
  TaskFindManyResolver,
  TaskFindOneResolver,
  TaskResolver,
  TaskUpdateOneResolver,
} from './task.resolver';
import { Task } from './task.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Task] })],
  providers: [
    TaskResolver,
    TaskFindOneResolver,
    TaskFindManyResolver,
    TaskCreateOneResolver,
    TaskUpdateOneResolver,
  ],
})
export class TaskModule {}
