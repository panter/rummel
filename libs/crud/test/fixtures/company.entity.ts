import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { CrudField } from '../../src';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Company {
  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @CrudField({ hideUpdate: true })
  @Field()
  name!: string;

  @CrudField({ hideCreate: true })
  @Field()
  description!: string;

  @CrudField({ hideUpdate: true })
  @Field()
  @ManyToOne(() => User)
  founder!: User;

  @CrudField({ hideCreate: true })
  @Field({ nullable: true })
  @ManyToOne(() => User, { nullable: true })
  ceo?: User;

  @CrudField({
    hideCreate: true,
    relation: { showCreate: true, showUpdate: true },
  })
  @Field({ nullable: true })
  @ManyToOne(() => User, { nullable: true })
  cto?: User;
}
