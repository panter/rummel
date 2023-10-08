import { Entity, Property } from '@mikro-orm/core';
import { Field, InterfaceType } from '@nestjs/graphql';
import { AppEntity } from './app.entity';

@InterfaceType({ isAbstract: true })
@Entity({ abstract: true })
export abstract class AuditableEntity extends AppEntity {
  // @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @Property()
  createdAt: Date = new Date();

  // @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
