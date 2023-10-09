import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Dummy2 } from './all-types-schema2.fixtures';
import { CrudField } from '../../../src';

export enum DummyEnum {
  A = 'A',
  B = 'B',
}

registerEnumType(DummyEnum, {
  name: 'DummyEnum',
});

@ObjectType()
@Entity()
export class Dummy {
  @Field(() => ID)
  @Property()
  idProp!: number;

  @Field(() => Int)
  @Property()
  intProp!: number;

  @Field(() => Float)
  @Property()
  floatProps!: number;

  @Field(() => DummyEnum)
  @Enum({ items: () => DummyEnum })
  enumProp!: DummyEnum;

  @Field()
  @Property()
  stringProp!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  optionalStringProp?: string;

  @Field(() => Boolean)
  @Property()
  boolProp!: boolean;

  @Field(() => Date)
  @Property()
  dateProp!: Date;

  @CrudField({
    typeFn: () => Dummy2,
    relation: { showCreate: true, showUpdate: true },
  })
  @Field(() => [Dummy2])
  @OneToMany(() => Dummy2, (dummy2) => dummy2.dummyProp)
  oneToManyProp = new Collection<Dummy2>(this);

  @CrudField({
    typeFn: () => Dummy2,
    relation: { showCreate: true, showUpdate: true },
  })
  @Field(() => [Dummy2])
  @ManyToMany(() => Dummy2, (dummy2) => dummy2.dummyProp)
  manyToManyProp = new Collection<Dummy2>(this);
}
