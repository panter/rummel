import { Type } from '@nestjs/common';

export type CrudGqlType<T extends string> = T extends '__-tsissue-__'
  ? never
  : any;
export type ClassName<T> = T extends { new (...args: any[]): any }
  ? T extends { entityName: infer N }
    ? N
    : never
  : never;

export type CrudEntityType<T, N> = Type<T> & { entityName: N };
