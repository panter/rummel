import { Field, ObjectType } from '@nestjs/graphql';
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { PermissionSubject } from './permission-subject.entity';
import { get } from 'lodash';
import { Role } from './role.entity';
import { AppEntity } from '../../common';
import { PermissionCondition } from '../../common/interfaces/authorization/types';

@ObjectType()
@Entity({ tableName: 'permission' })
export class Permission extends AppEntity {
  @Field()
  @Property()
  action: string;

  @ManyToOne(() => PermissionSubject, { onDelete: 'cascade' })
  subject: PermissionSubject;

  @ManyToMany({
    entity: () => Role,
    pivotTable: 'role_permissions',
    owner: false,
  })
  roles = new Collection<Role>(this);

  @Property({ type: 'jsonb', nullable: true })
  condition?: string;

  constructor(action: string, subject: PermissionSubject) {
    super();
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
