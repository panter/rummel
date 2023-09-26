import { AppAsset, AssetReference } from '@panter/nestjs-utils';
import {
  ArrayType,
  Cascade,
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { StorageLocation } from './storage-location.entity';
import { USER_TENANT_ID } from '../user-identity';

@ObjectType()
@Entity({ tableName: 'storage_location_assets' })
export class StorageLocationAssetReference extends AssetReference {
  @HideField()
  @ManyToOne(() => StorageLocation, { cascade: [Cascade.ALL] })
  storageLocation: StorageLocation;

  @Field(() => [String], { nullable: true })
  @Property({ type: ArrayType, nullable: true })
  tags?: string[];

  constructor(storageLocation: StorageLocation, asset: AppAsset) {
    super(USER_TENANT_ID, asset);
    this.storageLocation = storageLocation;
  }
}
