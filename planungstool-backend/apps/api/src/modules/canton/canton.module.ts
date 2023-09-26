import {
  CantonFindManyResolver,
  CantonFindOneResolver,
  CantonResolver,
} from './canton.resolver';

import { Canton } from './entities/canton.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Canton] })],
  providers: [CantonResolver, CantonFindOneResolver, CantonFindManyResolver],
})
export class CantonModule {}
