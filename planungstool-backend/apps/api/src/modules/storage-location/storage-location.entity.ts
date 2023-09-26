import { AppAsset, AuditableEntity, CrudField } from '@panter/nestjs-utils';
import {
  Cascade,
  Collection,
  Entity,
  Formula,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BuildingComponent } from '../building-component/entities/building-component.entity';
import { Contact } from '../contact/contact.entity';
import { StorageLocationAssetReference } from './storage-location-asset-reference.entity';

@ObjectType()
@Entity()
export class StorageLocation extends AuditableEntity {
  @Field()
  @Property({ unique: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  googleMapsLink?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  notes?: string;

  @Field({ defaultValue: 'CH', nullable: true })
  @Property({ default: 'CH', type: 'char(2)' })
  country: string = 'CH';

  @Field({ nullable: true })
  @Property({ nullable: true })
  city?: string;

  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field({ nullable: true })
  @Formula(
    (alias) =>
      `(SELECT CONCAT(pc.canton, ', ', pc.description) from postal_code pc where pc.postal_code = ${alias}.postal_code LIMIT 1)`,
  )
  canton?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  street?: string;

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => [StorageLocationAssetReference], { nullable: true })
  @OneToMany({
    entity: () => StorageLocationAssetReference,
    mappedBy: (l) => l.storageLocation,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  assets = new Collection<StorageLocationAssetReference>(this);

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

  @CrudField({ relation: { showCreate: false, showUpdate: false } })
  @Field(() => [BuildingComponent])
  @OneToMany(() => BuildingComponent, (p) => p.storageLocation)
  buildingComponents = new Collection<BuildingComponent>(this);

  addImage(asset: AppAsset) {
    this.assets.add(new StorageLocationAssetReference(this, asset));
  }

  removeImage(assetRef: StorageLocationAssetReference) {
    this.assets.remove(assetRef);
  }
}
