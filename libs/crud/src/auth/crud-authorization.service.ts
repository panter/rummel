import { Injectable, Logger } from '@nestjs/common';
import { CRUD_RESOURCE } from './crud-resource.decorator';
import { DiscoveryService } from '@nestjs/core';
import { CrudAuthorizeCallback } from './types';

@Injectable()
export class CrudAuthorizationService {
  private logger = new Logger(CrudAuthorizationService.name);
  public readonly resources: string[] = [];

  constructor(
    private readonly discovery: DiscoveryService,
    public readonly authorize?: CrudAuthorizeCallback,
  ) {
    this.authorize = authorize;
  }

  init() {
    const wrappers = this.discovery.getProviders();
    const crudResources: string[] = wrappers
      .filter(
        (wrapper) =>
          wrapper.metatype &&
          Reflect.getMetadata(CRUD_RESOURCE, wrapper.metatype),
      )
      .map((wrapper) => {
        return Reflect.getMetadata(CRUD_RESOURCE, wrapper.metatype);
      });
    const uniqueCrudResources = [...new Set(crudResources)];
    uniqueCrudResources.forEach((resource) => {
      this.logger.log(`Registering CRUD resource '${resource}'`);
    });
    this.registerResources(crudResources);
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
