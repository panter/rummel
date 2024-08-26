import { Type } from '@nestjs/common';

interface BaseCrudType<_T extends string> {}
export type CrudGqlType<T extends string> = BaseCrudType<T>;

export type ClassName<T> = T extends { new (...args: any[]): any }
  ? T extends { entityName: infer N }
    ? N
    : never
  : never;

export type CrudEntityType<T = any, N extends string = string> = Type<T> & {
  entityName: N;
};
