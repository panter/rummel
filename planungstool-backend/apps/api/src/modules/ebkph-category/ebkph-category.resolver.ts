import { EbkphCategory } from './ebkph-category.entity';
import {
  CreateOneResolver,
  FindManyResolver,
  FindOneResolver,
  Public,
  UpdateOneResolver,
} from '@panter/nestjs-utils';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EntityManager } from '@mikro-orm/core';

@Public()
@Resolver(() => EbkphCategory)
export class EbkphCategoryResolver {
  constructor(private readonly em: EntityManager) {}

  @ResolveField(() => EbkphCategory, { nullable: true })
  async parentId(
    @Parent() category: EbkphCategory,
  ): Promise<EbkphCategory | undefined> {
    await this.em.populate(category, ['parent']);
    return category.parent;
  }
}

@Resolver(() => EbkphCategory)
export class EbkphCategoryFindOneResolver extends FindOneResolver(
  EbkphCategory,
) {}

@Resolver(() => EbkphCategory)
export class EbkphCategoryFindManyResolver extends FindManyResolver(
  EbkphCategory,
) {}

@Resolver(() => EbkphCategory)
export class EbkphCategoryCreateOneResolver extends CreateOneResolver(
  EbkphCategory,
) {}

@Resolver(() => EbkphCategory)
export class EbkphCategoryUpdateOneResolver extends UpdateOneResolver(
  EbkphCategory,
) {}
