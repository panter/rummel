import { Embeddable, Property } from '@mikro-orm/core';
import { Field } from '@nestjs/graphql';

@Embeddable()
export class Name {
  @Field({ nullable: false })
  @Property({ nullable: false })
  firstname: string;

  @Field({ nullable: false })
  @Property({ nullable: false })
  lastname: string;
}
