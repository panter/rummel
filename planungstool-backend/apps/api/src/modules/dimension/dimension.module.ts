import { Dimension } from './dimension.entity';
import {
  DimensionFindManyResolver,
  DimensionResolver,
} from './dimension.resolver';
import { DimensionService } from './dimension.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DimensionRange } from './dimension-range.entity';
import {
  DimensionRangeFindManyResolver,
  DimensionRangeResolver,
} from './dimension-range.resolver';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Dimension, DimensionRange] }),
  ],
  providers: [
    DimensionResolver,
    DimensionService,
    DimensionFindManyResolver,
    DimensionRangeResolver,
    DimensionRangeFindManyResolver,
  ],
})
export class DimensionModule {}
