import { Entity, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType({ isAbstract: true })
@Entity({ abstract: true })
export abstract class AppEntity {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  toString(): string {
    return `${this.constructor.name}#${this.id}`;
  }
}
