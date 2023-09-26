import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { AuditableEntity, CrudField } from '@panter/nestjs-utils';

@ObjectType()
@Entity({ tableName: 'dimension_range' })
export class DimensionRange extends AuditableEntity {
  @Field({ nullable: true })
  @Property({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  minWidth?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  maxWidth?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  minHeight?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  maxHeight?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  minDepth?: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  maxDepth?: number;

  @CrudField({ hideCreate: true, hideUpdate: true, hideWhere: true })
  @Field(() => String)
  readonly unit = 'cm';

  toString(): string {
    let res = this.type ? `${this.type}: ` : '';
    res += this.minWidth ? this.minWidth.toString() : '';
    res += this.maxWidth ? `-${this.maxWidth.toString()}` : '';
    res += this.minHeight ? `x${this.minHeight.toString()}` : '';
    res += this.maxHeight ? `-${this.maxHeight.toString()}` : '';
    res += this.minDepth ? `x${this.minDepth.toString()}` : '';
    res += this.maxDepth ? `-${this.maxDepth.toString()}` : '';
    res += this.unit ? ` ${this.unit}` : '';
    return res;
  }
}
