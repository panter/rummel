import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { AuditableEntity } from '@panter/nestjs-utils';
import { BuildingComponent } from '../building-component/entities/building-component.entity';
import { SearchRequest } from '../search-request/search-request.entity';
import { User } from '../user-identity';
import { SearchRequestInterestState } from './search-request-interest-state.enum';

@ObjectType()
@Entity({ tableName: 'search_request_interest' })
export class SearchRequestInterest extends AuditableEntity {
  @Field(() => SearchRequest)
  @ManyToOne(() => SearchRequest)
  searchRequest!: SearchRequest;

  @Field(() => User)
  @ManyToOne(() => User)
  responsibleUser!: User;

  @Field(() => BuildingComponent)
  @ManyToOne(() => BuildingComponent)
  buildingComponent!: BuildingComponent;

  @Field(() => SearchRequestInterestState)
  @Enum({
    items: () => SearchRequestInterestState,
    default: SearchRequestInterestState.Open,
  })
  state: SearchRequestInterestState;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  rejectionReason?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  rejectedAt?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true })
  acceptedAt?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true })
  notes?: string;

  constructor() {
    super();
    this.state = SearchRequestInterestState.Open;
  }

  reject(rejectionReason?: string) {
    if (this.state === SearchRequestInterestState.Rejected) {
      return;
    }
    this.state = SearchRequestInterestState.Rejected;
    this.rejectionReason = rejectionReason;
    this.rejectedAt = new Date();
  }

  accept() {
    this.state = SearchRequestInterestState.Accepted;
    this.acceptedAt = new Date();
  }
}
