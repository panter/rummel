import {
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  getFieldsToPopulate,
  Public,
  UpdateOneResolver,
} from '@panter/nestjs-utils';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import { EntityManager } from '@mikro-orm/postgresql';
import { GraphQLResolveInfo } from 'graphql/type';
import { RejectSearchRequestInterestInput } from './inputs/reject-search-request-interest.input';
import { SearchRequestInterest } from './search-request-interest.entity';
import { SearchRequestInterestService } from './search-request-interest.service';
import { AcceptSearchRequestInterestInput } from './inputs/accept-search-request-interest.input';

@Public()
@Resolver(() => SearchRequestInterest)
export class SearchRequestInterestResolver {
  constructor(
    private em: EntityManager,
    private service: SearchRequestInterestService,
  ) {}

  @Mutation(() => SearchRequestInterest)
  async rejectSearchRequestInterest(
    @Args('input') input: RejectSearchRequestInterestInput,
    @Info() info: GraphQLResolveInfo,
  ): Promise<SearchRequestInterest> {
    const interest = await this.service.rejectInterest(
      input.interestId,
      input.rejectionReason,
    );
    await this.em.populate(
      interest,
      getFieldsToPopulate(info, SearchRequestInterest),
      {
        refresh: true,
      },
    );
    return interest;
  }

  @Mutation(() => SearchRequestInterest)
  async acceptSearchRequestInterest(
    @Args('input') input: AcceptSearchRequestInterestInput,
    @Info() info: GraphQLResolveInfo,
  ): Promise<SearchRequestInterest | undefined> {
    const interest = await this.service.acceptSearchRequestInterest(input);
    if (!interest) {
      return;
    }
    await this.em.populate(
      interest,
      getFieldsToPopulate(info, SearchRequestInterest),
      {
        refresh: true,
      },
    );
    return interest;
  }
}

@Resolver(() => SearchRequestInterest)
export class SearchRequestInterestFindManyResolver extends FindManyResolver(
  SearchRequestInterest,
) {}

@Resolver(() => SearchRequestInterest)
export class SearchRequestInterestFindOneResolver extends FindOneResolver(
  SearchRequestInterest,
) {}

@Resolver(() => SearchRequestInterest)
export class SearchRequestInterestCreateOneResolver extends CreateOneResolver(
  SearchRequestInterest,
) {}

@Resolver(() => SearchRequestInterest)
export class SearchRequestInterestUpdateOneResolver extends UpdateOneResolver(
  SearchRequestInterest,
) {}

@Resolver(() => SearchRequestInterest)
export class SearchRequestInterestDeleteOneResolver extends DeleteOneResolver(
  SearchRequestInterest,
) {}
