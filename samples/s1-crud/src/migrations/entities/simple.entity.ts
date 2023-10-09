import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CrudField } from '@panter/crud';

@ObjectType()
@Entity()
export class Simple {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Field({ nullable: true })
  @Property({ nullable: true })
  name?: string;

  @CrudField({ hideCreate: true })
  @Field({ nullable: true })
  @Property({ nullable: true })
  secondName?: string;

  @Field(() => Simple)
  @OneToOne(() => Simple)
  related?: Simple;
}
