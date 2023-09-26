import {
  ArrayType,
  Entity,
  EntityRepositoryType,
  Enum,
  Property,
} from '@mikro-orm/core';
import { Asset, AssetAccess } from '../../asset-manager';
import { ExcludeMethods, Tenant, TenantAware } from '../../common';
import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { AppAssetRepository } from './app-asset.repository';
import { AuditableEntity } from '../../common/entities/auditable.entity';
import { GraphQLBigInt } from 'graphql-scalars';

export type AppAssetProperties = ExcludeMethods<Omit<Asset, 'ownerId'>>;

@ObjectType()
@Entity({ tableName: 'asset', customRepository: () => AppAssetRepository })
export class AppAsset
  extends AuditableEntity
  implements AppAssetProperties, TenantAware
{
  @HideField()
  [EntityRepositoryType]?: AppAssetRepository;

  @HideField()
  @Enum({ items: () => AssetAccess })
  access: AssetAccess;

  @Field()
  @Property()
  mimeType: string;

  @Field()
  @Property()
  originalFilename: string;

  @Field(() => GraphQLBigInt)
  @Property({ type: 'bigint' })
  size: number;

  @HideField()
  @Property()
  storage: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  confirmedAt?: Date;

  @HideField()
  @Property({ type: 'string' })
  tenant: Tenant;

  @Field(() => [String], { nullable: true })
  @Property({ type: ArrayType, nullable: true })
  tags?: string[];

  getTenantId(): string {
    return this.tenant;
  }

  hasSameTenant(other: TenantAware): boolean {
    return this.getTenantId() === other.getTenantId();
  }

  constructor(
    tenant: Tenant,
    { id, access, storage, originalFilename, mimeType, size, url }: Asset,
  ) {
    super();
    this.id = id;
    this.tenant = tenant;
    this.access = access;
    this.storage = storage;
    this.originalFilename = originalFilename;
    this.mimeType = mimeType;
    this.size = size;
    this.url = url;
  }

  toAsset(): Asset {
    return new Asset(
      this.id,
      this.originalFilename,
      this.mimeType,
      this.size,
      this.storage,
      this.tenant,
      this.access,
      this.createdAt,
    );
  }
}
