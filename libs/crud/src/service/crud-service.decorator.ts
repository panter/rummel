import { SetMetadata } from '@nestjs/common';
import { CrudEntityType } from '..';

export const CRUD_SERVICE = 'CRUD_SERVICE';

/**
 * Decorator to mark a service as a CRUD service.
 * This is used to discover the services by the CrudServiceFactory.
 *
 * @param entity - The entity class to mark the service for
 */
export function CrudServiceResource<T, NA extends string>(
  entity: CrudEntityType<T, NA>,
): ClassDecorator {
  return SetMetadata(CRUD_SERVICE, entity);
}
