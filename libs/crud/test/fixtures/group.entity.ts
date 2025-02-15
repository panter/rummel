import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { CrudField } from '../../src';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Group {
  static readonly entityName = 'Group';

  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @CrudField({ hideUpdate: true })
  @Field()
  @Property()
  name!: string;

  @Field()
  @Property()
  description!: string;

  @CrudField({
    hideCreate: false,
    hideUpdate: true,
    relation: { showConnect: true },
  })
  @Field(() => [User])
  @ManyToMany({ entity: () => User })
  founders = new Collection<User>(this);

  @CrudField({
    hideCreate: true,
    relation: { showConnect: true, showDisconnect: true },
  })
  @Field(() => [User], { nullable: true })
  @ManyToMany({ entity: () => User, nullable: true })
  coordinator = new Collection<User>(this);

  @CrudField({
    hideCreate: true,
    hideUpdate: false,
    relation: {
      showCreate: true,
      showUpdate: true,
      showConnect: true,
      showDisconnect: true,
    },
  })
  @Field(() => [User], { nullable: true })
  @ManyToMany({ entity: () => User, nullable: true })
  finance? = new Collection<User>(this);
}
