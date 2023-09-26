import { AppAsset, AssetReference } from '@panter/nestjs-utils';
import {
  ArrayType,
  Cascade,
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { SearchRequest } from './search-request.entity';
import { USER_TENANT_ID } from '../user-identity';

@ObjectType()
@Entity({ tableName: 'search_request_assets' })
export class SearchRequestAssetReference extends AssetReference {
  @HideField()
  @ManyToOne(() => SearchRequest, { cascade: [Cascade.ALL] })
  searchRequest: SearchRequest;

  @Field(() => [String], { nullable: true })
  @Property({ type: ArrayType, nullable: true })
  tags?: string[];

  constructor(searchRequest: SearchRequest, asset: AppAsset) {
    super(USER_TENANT_ID, asset);
    this.searchRequest = searchRequest;
  }
}
