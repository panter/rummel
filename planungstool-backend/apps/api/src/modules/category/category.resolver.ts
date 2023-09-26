import {
  CreateOneResolver,
  FindManyResolver,
  FindOneResolver,
  Public,
  UpdateOneResolver,
} from '@panter/nestjs-utils';

import { Category } from './category.entity';
import { Project } from '../project/entities/project.entity';
import { Resolver } from '@nestjs/graphql';

@Public()
@Resolver(() => Category)
export class CategoryResolver {}

@Resolver(() => Category)
export class CategoryFindOneResolver extends FindOneResolver(Category) {}

@Resolver(() => Category)
export class CategoryFindManyResolver extends FindManyResolver(Category) {}

@Resolver(() => Project)
export class CategoryCreateOneResolver extends CreateOneResolver(Category) {}

@Resolver(() => Project)
export class CategoryUpdateOneResolver extends UpdateOneResolver(Category) {}
