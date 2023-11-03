import { Field, ObjectType } from '@nestjs/graphql';
import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { get } from 'lodash';
import { AppRole } from '../entities/role.entity';
import { PermissionCondition } from './interfaces/types';

@ObjectType()
@Entity({ tableName: 'permission' })
export class Permission {
  [PrimaryKeyType]?: [string, string];

  @Field()
  @PrimaryKey()
  action: string;

  @Field()
  @PrimaryKey()
  subject: string;

  @ManyToMany({
    entity: () => AppRole,
  })
  roles = new Collection<AppRole>(this);

  @Property({ type: 'jsonb', nullable: true })
  condition?: string;

  constructor(action: string, subject: string) {
    this.action = action;
    this.subject = subject;
  }

  /**
   * @param condition: {"departmentId": "${id}"}
   * @param variables: {'id: 1'}
   * @return condition after parse: {"departmentId": 1}
   */
  public static parseCondition(
    condition: any,
    variables: Record<string, any>,
  ): PermissionCondition | null {
    if (!condition) return null;
    const parsedCondition: Record<string, any> = {};
    for (const [key, rawValue] of Object.entries(condition)) {
      if (rawValue !== null && typeof rawValue === 'object') {
        parsedCondition[key] = this.parseCondition(rawValue, variables);
        continue;
      }
      if (typeof rawValue !== 'string') {
        parsedCondition[key] = rawValue;
        continue;
      }
      // find placeholder "${}""
      const matches = /^\${([a-zA-Z0-9.]+)}$/.exec(rawValue);
      if (!matches) {
        parsedCondition[key] = rawValue;
        continue;
      }
      const value = get(variables, matches[1]);
      if (typeof value === 'undefined') {
        throw new ReferenceError(`Variable ${matches[1]} is not defined`);
      }
      parsedCondition[key] = value;
    }
    return parsedCondition;
  }
}
