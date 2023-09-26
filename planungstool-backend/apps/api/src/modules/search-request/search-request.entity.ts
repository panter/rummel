import { AuditableEntity, CrudField } from '@panter/nestjs-utils';
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

import { Category } from '../category/category.entity';
import { EbkphCategory } from '../ebkph-category/ebkph-category.entity';
import { GraphQLBigInt } from 'graphql-scalars';
import { Project } from '../project/entities/project.entity';
import { QuantityUnit } from '../building-component/building-component.enum';
import { SearchRequestInterest } from '../search-request-interest/search-request-interest.entity';
import { User } from '../user-identity';
import { DimensionRange } from '../dimension/dimension-range.entity';
import { SearchRequestAssetReference } from './search-request-asset-reference.entity';
import { AssignedBuildingComponent } from '../search-request-interest/assigned-building-component.entity';
import { SearchRequestState } from './search-request.enum';

@ObjectType()
@Entity({ tableName: 'search_request' })
export class SearchRequest extends AuditableEntity {
  @Field(() => SearchRequestState)
  @Enum({
    items: () => SearchRequestState,
    default: SearchRequestState.draft,
  })
  state: SearchRequestState = SearchRequestState.draft;

  @Field({ nullable: true })
  @Property({ nullable: true })
  buildingComponentName?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  buildingComponentDescription?: string;

  @Field(() => GraphQLBigInt, { nullable: true })
  @Property({ type: 'bigint', nullable: true })
  quantity?: number;

  @Field(() => QuantityUnit, { nullable: true })
  @Enum({ items: () => QuantityUnit, nullable: true })
  quantityUnit?: QuantityUnit;

  @Field({ nullable: true })
  @Property({ nullable: true })
  deadlineFound?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true })
  deadlineShipment?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  comments?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  budgetInRappens?: number;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  budgetNotes?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  searchConceptNotes?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  huntingStatusNotes?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  fireProtectionNotes?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  soundProofNotes?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  securityNotes?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fallbackLevel?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fallbackLevelCO2PerUnit?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  fallbackLevelCO2Total?: number;

  @Field(() => Project)
  @ManyToOne(() => Project)
  project!: Project;

  @Field(() => User)
  @ManyToOne(() => User)
  responsibleUser!: User;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, { nullable: true })
  category?: Category;

  @Field(() => EbkphCategory, { nullable: true })
  @ManyToOne(() => EbkphCategory, { nullable: true })
  ebkphCategory?: EbkphCategory;

  @Field(() => [SearchRequestInterest])
  @OneToMany(() => SearchRequestInterest, (interest) => interest.searchRequest)
  interests = new Collection<SearchRequestInterest>(this);

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => [DimensionRange], { nullable: true })
  @ManyToMany({ entity: () => DimensionRange, owner: true, eager: true })
  dimensionRanges = new Collection<DimensionRange>(this);

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => [SearchRequestAssetReference], { nullable: true })
  @OneToMany({
    entity: () => SearchRequestAssetReference,
    mappedBy: (l) => l.searchRequest,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  assets = new Collection<SearchRequestAssetReference>(this);

  @Field(() => [AssignedBuildingComponent])
  @OneToMany({
    entity: () => AssignedBuildingComponent,
    mappedBy: (e) => e.searchRequest,
  })
  assignedBuildingComponents = new Collection<AssignedBuildingComponent>(this);

  constructor(props?: Pick<SearchRequest, 'project'>) {
    super();
    if (props) {
      this.project = props.project;
    }
  }

  toString(): string {
    let res = ``;
    if (this.buildingComponentName) {
      res += `, ${this.buildingComponentName}`;
    }
    if (this.dimensionRanges) {
      res += `, ${this.dimensionRanges.getItems().toString()}`;
    }
    if (this.quantity) {
      res += ` ${this.quantity.toString()} ${this.quantityUnit}`.trim();
    }

    return res;
  }
}
