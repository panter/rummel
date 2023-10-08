import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { Tenant, TenantAware } from '../../common';

import { AppAsset } from './app-asset.entity';
import { AuditableEntity } from '../../common/entities/auditable.entity';

@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
export abstract class AssetReference
  extends AuditableEntity
  implements TenantAware
{
  @Field(() => AppAsset)
  @OneToOne({ entity: () => AppAsset, owner: true, onDelete: 'cascade' })
  asset!: AppAsset;

  @Property({ type: 'string', nullable: true })
  tenant: Tenant;

  getTenantId(): string {
    return this.tenant;
  }

  hasSameTenant(other: TenantAware): boolean {
    return this.getTenantId() === other.getTenantId();
  }

  protected constructor(tenant: Tenant, asset: AppAsset) {
    super();
    this.tenant = tenant;
    this.asset = asset;
    //this probably shouldn't be in this module
    if (this.asset) {
      this.asset.confirmedAt = new Date();
    }
  }
}
