import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, Property } from '@mikro-orm/postgresql';

import { Dummy } from './all-types-shema.fixtures';

@ObjectType()
@Entity()
export class Dummy2 {
  @Field(() => ID)
  @Property()
  idProp!: number;

  @Field(() => Dummy)
  @ManyToOne(() => Dummy)
  dummyProp!: Dummy;
}
