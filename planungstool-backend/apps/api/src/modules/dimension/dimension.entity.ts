import { AuditableEntity, CrudField } from '@panter/nestjs-utils';
import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ tableName: 'dimension' })
export class Dimension extends AuditableEntity {
  @Field({ nullable: true })
  @Property({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  width?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  height?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  depth?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  isExact?: boolean;

  @CrudField({ hideCreate: true, hideUpdate: true, hideWhere: true })
  @Field(() => String, { nullable: true })
  readonly unit = 'cm';

  toString(): string {
    let res = this.type ? `${this.type}: ` : '';
    res += !this.isExact ? '~' : '';
    res += this.width ? this.width.toString() : '';
    res += this.height ? `x${this.height.toString()}` : '';
    res += this.depth ? `x${this.depth.toString()}` : '';
    res += this.unit ? ` ${this.unit}` : '';
    return res;
  }

  clone(): Dimension {
    return Object.assign(new Dimension(), this);
  }
}
