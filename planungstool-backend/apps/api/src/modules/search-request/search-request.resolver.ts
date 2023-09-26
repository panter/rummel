import {
  CreateOneResolver,
  FindManyResolver,
  FindOneResolver,
  Public,
  ReferenceId,
  UpdateOneResolver,
} from '@panter/nestjs-utils';
import { Int, ResolveField, Resolver } from '@nestjs/graphql';
import { SearchRequest } from './search-request.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Public()
@Resolver(() => SearchRequest)
export class SearchRequestResolver {
  constructor(private readonly em: EntityManager) {}

  @ResolveField(() => ReferenceId, { nullable: true })
  async categoryId(parent: SearchRequest) {
    await this.em.populate(parent, ['category.id']);
    return parent.category || null;
  }

  @ResolveField(() => ReferenceId, { nullable: true })
  async ebkphCategoryId(parent: SearchRequest) {
    await this.em.populate(parent, ['ebkphCategory.id']);
    return parent.ebkphCategory || null;
  }

  @ResolveField(() => ReferenceId, { nullable: true })
  async responsibleUserId(parent: SearchRequest): Promise<ReferenceId> {
    await this.em.populate(parent, ['responsibleUser.id']);
    return parent.responsibleUser;
  }

  @ResolveField(() => ReferenceId, { nullable: true })
  async projectId(parent: SearchRequest) {
    await this.em.populate(parent, ['project.id']);
    return parent.project;
  }

  @ResolveField(() => Int)
  async assignedBuildingComponentsCount(searchRequest: SearchRequest) {
    return searchRequest.assignedBuildingComponents
      .loadItems()
      .then((items) => {
        return items.reduce((acc, curr) => {
          return (acc = curr.amount);
        }, 0);
      });
  }

  @ResolveField(() => Int)
  async reservedBuildingComponentsCount(searchRequest: SearchRequest) {
    return searchRequest.assignedBuildingComponents
      .loadItems()
      .then((items) => {
        return items.reduce((acc, curr) => {
          return (acc = curr.amountReserved);
        }, 0);
      });
  }
}

@Resolver(() => SearchRequest)
export class SearchRequestFindManyResolver extends FindManyResolver(
  SearchRequest,
) {}

@Resolver(() => SearchRequest)
export class SearchRequestFindOneResolver extends FindOneResolver(
  SearchRequest,
) {}

@Resolver(() => SearchRequest)
export class SearchRequestCreateOneResolver extends CreateOneResolver(
  SearchRequest,
) {}

@Resolver(() => SearchRequest)
export class SearchRequestUpdateOneResolver extends UpdateOneResolver(
  SearchRequest,
) {}
