import { Injectable } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { CrudEntityType } from '../graphql/crud-types';
import { CrudEntityService, ICrudEntityService } from './crud-entity.service';
import { CRUD_SERVICE } from './crud-service.decorator';

/**
 * Factory to get the correct CRUD service for a given entity.
 *
 * To provide a default CRUD service, the factory will return the provided CRUD service if no specific service is found.
 *
 * @example
 * @CrudServiceResource({ entity: PersonEntity })
 * @Injectable()
 * export class PersonEntityService implements ICrudEntityService<PersonEntity> {}
 *
 */
@Injectable()
export class CrudEntityServiceFactory {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly defaultCrudEntityService: CrudEntityService<any>,
  ) {}

  /**
   * Get the CRUD service for the given entity.
   * If no service is found, the default service will be returned.
   * The decorator CrudServiceResource will be used to find the service a entity.
   *
   */
  getCrudService<T extends object>(
    entity: CrudEntityType<T>,
  ): ICrudEntityService<T> {
    const providers = this.discovery.getProviders();

    const provider = providers.find((wrapper) => {
      if (!wrapper.metatype || !wrapper.instance) return false;

      const metadata = this.reflector.get(CRUD_SERVICE, wrapper.metatype);
      return metadata === entity;
    });

    if (!provider || !provider.instance) {
      // TODO: make sure i can reuse the instance if this is on how to solve it
      return this.defaultCrudEntityService;
    }

    return provider.instance;
  }
}
