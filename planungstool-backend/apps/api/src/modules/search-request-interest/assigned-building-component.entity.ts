import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SearchRequest } from '../search-request/search-request.entity';
import { BuildingComponent } from '../building-component/entities/building-component.entity';
import { AuditableEntity } from '@panter/nestjs-utils';

@ObjectType()
@Entity()
export class AssignedBuildingComponent extends AuditableEntity {
  @Field(() => SearchRequest)
  @ManyToOne(() => SearchRequest, { eager: true })
  searchRequest!: SearchRequest;

  @Field(() => BuildingComponent)
  @OneToOne(() => BuildingComponent)
  buildingComponent!: BuildingComponent;

  @Field(() => Int)
  @Property()
  amount: number;

  @Field(() => Int)
  @Property({ default: 0 })
  amountReserved: number = 0;

  constructor(
    searchRequest: SearchRequest,
    buildingComponent: BuildingComponent,
    amount: number,
    amountReserved?: number,
  ) {
    super();
    this.buildingComponent = buildingComponent;
    this.searchRequest = searchRequest;
    this.amount = amount;
    this.amountReserved = amountReserved || 0;
  }
}
