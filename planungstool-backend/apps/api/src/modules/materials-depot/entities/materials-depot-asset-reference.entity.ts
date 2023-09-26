import { AppAsset, AssetReference } from '@panter/nestjs-utils';
import {
  ArrayType,
  Cascade,
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { MaterialsDepot } from './materials-depot.entity';
import { USER_TENANT_ID } from '../../user-identity';

@ObjectType()
@Entity({ tableName: 'materials_depot_assets' })
export class MaterialsDepotAssetReference extends AssetReference {
  @HideField()
  @ManyToOne(() => MaterialsDepot, { cascade: [Cascade.ALL] })
  materialsDepot: MaterialsDepot;

  @Field(() => [String], { nullable: true })
  @Property({ type: ArrayType, nullable: true })
  tags?: string[];

  constructor(materialsDepot: MaterialsDepot, asset: AppAsset) {
    super(USER_TENANT_ID, asset);
    this.materialsDepot = materialsDepot;
  }
}
