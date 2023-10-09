import { v4 } from 'uuid';
import { Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CrudField } from '@panter/crud';
import { AsyncJobMetadata } from './async-job-config-metadata.entity';

@ObjectType()
@Entity()
export class AsyncJobConfig {
  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field(() => ID)
  @PrimaryKey()
  id: string = v4();

  @Field()
  @Property()
  handlerUrl: string;

  @Field()
  @Property()
  ownerId: string;

  @Field()
  @Property()
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  label?: string;

  @Field(() => [AsyncJobMetadata], { nullable: true })
  @Embedded(() => AsyncJobMetadata, { array: true, nullable: true })
  metadata: AsyncJobMetadata[] = [];
}
