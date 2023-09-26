import { Resolver } from '@nestjs/graphql';
import {
  CreateOneResolver,
  FindManyResolver,
  FindOneResolver,
  Public,
  UpdateOneResolver,
} from '@panter/nestjs-utils';
import { Task } from './task.entity';

@Public()
@Resolver(() => Task)
export class TaskResolver {}

@Resolver(() => Task)
export class TaskFindOneResolver extends FindOneResolver(Task) {}

@Resolver(() => Task)
export class TaskFindManyResolver extends FindManyResolver(Task) {}

@Resolver(() => Task)
export class TaskCreateOneResolver extends CreateOneResolver(Task) {}

@Resolver(() => Task)
export class TaskUpdateOneResolver extends UpdateOneResolver(Task) {}
