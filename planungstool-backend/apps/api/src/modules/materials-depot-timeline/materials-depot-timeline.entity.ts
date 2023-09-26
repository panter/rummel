import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { AuditableEntity } from '@panter/nestjs-utils';
import { MaterialsDepot } from '../materials-depot/entities/materials-depot.entity';

@ObjectType()
@Entity()
export class MaterialsDepotTimeline extends AuditableEntity {
  @Field()
  @Property()
  description!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true })
  endDate?: Date;

  @ManyToOne(() => MaterialsDepot)
  materialsDepot!: MaterialsDepot;
}
