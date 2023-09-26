import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { AppEntity } from '@panter/nestjs-utils';

@ObjectType()
@Entity({ tableName: 'ebkph-category' })
export class EbkphCategory extends AppEntity {
  @Field()
  @Property()
  name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @ManyToOne({ entity: () => EbkphCategory, nullable: true })
  parent?: EbkphCategory;

  constructor(props?: {
    name: string;
    description?: string;
    parent?: EbkphCategory;
  }) {
    super();
    if (!props) {
      return;
    }
    const { name, description, parent } = props;
    this.name = name;
    this.description = description;
    this.parent = parent;
  }
}
