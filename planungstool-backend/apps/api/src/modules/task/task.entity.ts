import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from '@panter/nestjs-utils';

@ObjectType()
@Entity()
export class Task extends AuditableEntity {
  @Field()
  @Property({ type: 'text' })
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true })
  closedAt?: Date;
}
