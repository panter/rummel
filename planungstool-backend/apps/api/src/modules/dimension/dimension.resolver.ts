import { Dimension } from './dimension.entity';
import { DimensionService } from './dimension.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { FindManyResolver, Public } from '@panter/nestjs-utils';
import { Resolver } from '@nestjs/graphql';

@Public()
@Resolver(() => Dimension)
export class DimensionResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly dimensionService: DimensionService,
  ) {}
}

@Resolver(() => Dimension)
export class DimensionFindManyResolver extends FindManyResolver(Dimension) {}
