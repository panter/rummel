import { AppAsset, AssetReference } from '@panter/nestjs-utils';
import {
  ArrayType,
  Cascade,
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { BuildingComponent } from './building-component.entity';
import { USER_TENANT_ID } from '../../user-identity';

@ObjectType()
@Entity({ tableName: 'building_component_assets' })
export class BuildingComponentAssetReference extends AssetReference {
  @HideField()
  @ManyToOne(() => BuildingComponent, { cascade: [Cascade.ALL] })
  buildingComponent: BuildingComponent;

  @Field(() => [String], { nullable: true })
  @Property({ type: ArrayType, nullable: true })
  tags?: string[];

  constructor(buildingComponent: BuildingComponent, asset: AppAsset) {
    super(USER_TENANT_ID, asset);
    this.buildingComponent = buildingComponent;
  }
}
