import {
  AppAsset,
  AuditableEntity,
  CrudField,
  TenantAware,
} from '@panter/nestjs-utils';
import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { User, USER_TENANT_ID } from '../../user-identity';

import { ProjectAssetReference } from './project-asset-reference.entity';
import { Contact } from '../../contact/contact.entity';
import { ProjectPhase, ProjectState } from '../project.enum';

@ObjectType()
@Entity({ tableName: 'project' })
export class Project extends AuditableEntity {
  @Field({ nullable: true })
  @Property({ nullable: true })
  type?: string;

  @Field()
  @Property()
  shortName!: string;

  @Field()
  @Property()
  name!: string;

  @Field(() => ProjectState)
  @Enum({
    items: () => ProjectState,
    default: ProjectState.draft,
  })
  state: ProjectState = ProjectState.draft;

  @Field(() => ProjectPhase)
  @Enum({
    items: () => ProjectPhase,
    default: ProjectPhase.empty,
  })
  phase: ProjectPhase = ProjectPhase.empty;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'set null',
  })
  responsableUserPM!: User;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'set null',
  })
  responsableUserSearch!: User;

  @Field({ defaultValue: 'CH', nullable: true })
  @Property({ default: 'CH', type: 'char(2)' })
  country: string = 'CH';

  @Field({ nullable: true })
  @Property({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  notes?: string;

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => [ProjectAssetReference], { nullable: true })
  @OneToMany({
    entity: () => ProjectAssetReference,
    mappedBy: (l) => l.project,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  assets = new Collection<ProjectAssetReference>(this);

  @Field(() => AppAsset, { nullable: true })
  @ManyToOne({
    entity: () => AppAsset,
    nullable: true,
  })
  mainImage?: AppAsset;

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => [Contact], { nullable: true })
  @ManyToMany({ entity: () => Contact, owner: true })
  contacts = new Collection<Contact>(this);

  addAsset(asset: AppAsset) {
    this.assets.add(new ProjectAssetReference(this, asset));
  }

  removeAsset(assetRef: ProjectAssetReference) {
    this.assets.remove(assetRef);
  }

  getTenantId(): string {
    return USER_TENANT_ID;
  }

  hasSameTenant(other: TenantAware): boolean {
    return this.getTenantId() === other.getTenantId();
  }

  toString(): string {
    return `${this.shortName}, ${this.fullAddress} ${
      this.type ? `(${this.type})` : ''
    }`;
  }

  get fullAddress(): string {
    let address = '';
    if (this.street) {
      address += this.street + ', ';
    }
    if (this.postalCode) {
      address += this.postalCode + ' ';
    }
    if (this.city) {
      address += this.city;
    }

    return address;
  }
}
