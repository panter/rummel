import { FindManyResolver, Public } from '@panter/nestjs-utils';
import { Resolver } from '@nestjs/graphql';
import { DimensionRange } from './dimension-range.entity';

@Public()
@Resolver(() => DimensionRange)
export class DimensionRangeResolver {}

@Resolver(() => DimensionRange)
export class DimensionRangeFindManyResolver extends FindManyResolver(
  DimensionRange,
) {}
