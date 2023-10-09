import {
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { CrudField } from '../../src';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Group {
  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @CrudField({ hideUpdate: true })
  @Field()
  name!: string;

  @Field()
  @Property()
  description!: string;

  @CrudField({ hideUpdate: true })
  @Field(() => [User])
  @ManyToMany({ entity: () => User })
  founders!: User[];

  @CrudField({ hideCreate: true })
  @Field(() => [User], { nullable: true })
  @ManyToMany({ entity: () => User, nullable: true })
  coordinator?: User[];

  @CrudField({
    hideCreate: true,
    relation: { showCreate: true, showUpdate: true },
  })
  @Field(() => [User], { nullable: true })
  @ManyToMany({ entity: () => User, nullable: true })
  finance?: User[];
}
