import { registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, { name: 'SortOrder' });

export enum SringQueryMode {
  default,
  insensitive,
}
registerEnumType(SringQueryMode, { name: 'SringQueryMode' });

export function registerCrudEnums() {
  //register
}
