import { AppAsset, AssetReference } from '@panter/nestjs-utils';
import {
  ArrayType,
  Cascade,
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { Project } from './project.entity';
import { USER_TENANT_ID } from '../../user-identity';

@ObjectType()
@Entity({ tableName: 'project_assets' })
export class ProjectAssetReference extends AssetReference {
  @HideField()
  @ManyToOne(() => Project, { cascade: [Cascade.ALL] })
  project: Project;

  @Field(() => [String], { nullable: true })
  @Property({ type: ArrayType, nullable: true })
  tags?: string[];

  constructor(project: Project, asset: AppAsset) {
    super(USER_TENANT_ID, asset);
    this.project = project;
  }
}
