import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { CrudField } from '../../src';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Company {
  static readonly entityName = 'Company';

  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @CrudField({ hideUpdate: true })
  @Field()
  @Property()
  name!: string;

  @CrudField({ hideCreate: true })
  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

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
