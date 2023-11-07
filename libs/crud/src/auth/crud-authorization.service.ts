import { Injectable, Logger } from '@nestjs/common';
import { CRUD_RESOURCE } from './crud-resource.decorator';
import { DiscoveryService } from '@nestjs/core';
import { CrudAuthorizeCallback } from './types';

@Injectable()
export class CrudAuthorizationService {
  private logger = new Logger(CrudAuthorizationService.name);
  public readonly resources: string[] = [];

  /**
   * Default authorization callback for all CRUD resources.
   * This callback will be used if no authorization callback is set on the resource handler.
   */
  defaultAuthorizationCallback?: CrudAuthorizeCallback;

  constructor(
    private readonly discovery: DiscoveryService,
    defaultAuthorizationCallback?: CrudAuthorizeCallback,
  ) {
    this.defaultAuthorizationCallback = defaultAuthorizationCallback;
  }

  init() {
    const wrappers = this.discovery.getProviders();
    const crudResources = wrappers
      .filter(
        (wrapper) =>
          wrapper.metatype &&
          Reflect.getMetadata(CRUD_RESOURCE, wrapper.metatype),
      )
      .map((wrapper) => {
        return {
          name: Reflect.getMetadata(CRUD_RESOURCE, wrapper.metatype),
          handler: wrapper.instance,
        };
      });

    const uniqueCrudResources = [...new Set(crudResources.map((r) => r.name))];
    uniqueCrudResources.forEach((resource) => {
      this.logger.debug(`Registering CRUD resource '${resource}'`);
    });
    this.registerResources(uniqueCrudResources);

    crudResources.forEach((resource) => {
      if (
        Object.prototype.hasOwnProperty.call(
          resource.handler,
          'authorizeCallback',
        ) &&
        resource.handler.authorizeCallback === undefined
      ) {
        this.logger.debug(
          `Found CRUD resource '${resource.name}' handler '${resource.handler.constructor.name}' without authorization callback. Setting default.`,
        );
        resource.handler.authorizeCallback = this.defaultAuthorizationCallback;
      }
    });
  }

  registerResource(resource: string) {
    if (!this.resources.includes(resource)) {
      this.resources.push(resource);
    }
  }

  registerResources(resources: string[]) {
    resources.forEach((resource) => this.registerResource(resource));
  }
}
