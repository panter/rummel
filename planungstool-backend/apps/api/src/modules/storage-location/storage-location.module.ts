import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  StorageLocationCreateOneResolver,
  StorageLocationFindManyResolver,
  StorageLocationFindOneResolver,
  StorageLocationResolver,
  StorageLocationUpdateOneResolver,
} from './storage-location.resolver';
import { StorageLocation } from './storage-location.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [StorageLocation] })],
  providers: [
    StorageLocationResolver,
    StorageLocationFindOneResolver,
    StorageLocationFindManyResolver,
    StorageLocationCreateOneResolver,
    StorageLocationUpdateOneResolver,
  ],
})
export class StorageLocationModule {}
