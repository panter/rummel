import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CrudField } from '@panter/crud';
import { Person } from './person.entity';
import { Simple } from './simple.entity';

@ObjectType()
@Entity()
export class Organisation {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @Field(() => [Person])
  @OneToMany({
    entity: () => Person,
    mappedBy: (p) => p.organisation,
  })
  persons = new Collection<Person>(this);

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => Simple, { nullable: true })
  @ManyToOne(() => Simple, { nullable: true })
  simple?: Simple;
}
