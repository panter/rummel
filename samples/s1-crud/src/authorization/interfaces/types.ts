import { Ability, InferSubjects } from '@casl/ability';

export enum CrudPermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type PermissionAction = CrudPermissionAction | string;

export type PermissionSubjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionSubjectType]>;

export interface PermissionCondition {
  [key: string]: any;
}

export interface CaslPermission<C = any> {
  action: PermissionAction;
  subject: InferSubjects<C> | 'all';
  condition?: PermissionCondition;
}
