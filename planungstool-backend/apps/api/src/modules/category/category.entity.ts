import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { AppEntity } from '@panter/nestjs-utils';

@ObjectType()
@Entity({ tableName: 'category' })
export class Category extends AppEntity {
  @Field()
  @Property({ unique: true })
  name!: string;

  @Field({ nullable: true })
  @Property({ type: 'text', nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  sortOrder?: number;

  @Field({ nullable: true })
  @ManyToOne({ entity: () => Category, nullable: true })
  parent?: Category;

  constructor(props?: {
    name: string;
    sortOrder?: number;
    description?: string;
    parent?: Category;
  }) {
    super();
    if (!props) {
      return;
    }
    const { name, description, parent, sortOrder } = props || {};

    this.name = name;
    this.sortOrder = sortOrder;
    this.parent = parent;
    this.description = description;
  }
}
