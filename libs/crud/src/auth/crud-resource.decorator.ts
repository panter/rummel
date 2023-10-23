import { SetMetadata } from '@nestjs/common';

export const CRUD_RESOURCE = 'CrudResource';

export const CrudResource = (resourceName: string) =>
  SetMetadata(CRUD_RESOURCE, resourceName);
