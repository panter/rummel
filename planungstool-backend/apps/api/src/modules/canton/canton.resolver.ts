import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  FindManyResolver,
  FindOneResolver,
  PostalCode,
  Public,
} from '@panter/nestjs-utils';
import { Canton } from './entities/canton.entity';
import { CantonByPostalCodeAndCityInput } from './inputs/canton-by-postalcode-and-city.input';
import { EntityManager } from '@mikro-orm/core';

@Public()
@Resolver(() => Canton)
export class CantonResolver {
  constructor(private readonly em: EntityManager) {}

  @Query(() => String)
  async cantonByPostalCodeAndCity(
    @Args('input') input: CantonByPostalCodeAndCityInput,
  ): Promise<string> {
    const postalCode = await this.em.findOne(PostalCode, {
      postalCode: input.postalCode,
    });
    return postalCode?.canton || '';
  }
}

@Resolver(() => Canton)
export class CantonFindOneResolver extends FindOneResolver(Canton) {}

@Public()
@Resolver(() => Canton)
export class CantonFindManyResolver extends FindManyResolver(Canton) {}
