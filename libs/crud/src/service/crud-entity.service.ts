import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Injectable, Type } from '@nestjs/common';
import { EntityIdInput } from '../graphql';
import { OrmData } from '../';
import { AuthenticatedUser } from '../graphql/types';

export type ICrudEntityServiceUpsertContext<T, D = any> = {
  classRef: Type<T>;
  currentUser?: AuthenticatedUser | null | undefined;
  data?: D;
  where?: EntityIdInput;
};

/**
 * CRUD service interface for entities.
 * Made to work with the @CrudService so it can be discovered by the CrudServiceFactory.
 */
export interface ICrudEntityService<
  T extends object,
  D extends OrmData<T> = OrmData<T>,
> {
  /*
   * Create a new entity based on the provided context.
   * The entity is optional and can be provided to update a new created entity
   *
   * @param context
   * @param fromEntity - optional already created entity to update
   */
  createOne(
    context: ICrudEntityServiceUpsertContext<T, D>,
    fromEntity?: T,
  ): Promise<T | null | undefined>;

  /*
   * Update an entity based on the provided context
   *
   * @param entity - the entity to update
   * @param context
   */
  updateOne(
    entity: T,
    context: ICrudEntityServiceUpsertContext<T, D>,
  ): Promise<T | null | undefined>;
}

@Injectable()
export class CrudEntityService<
  T extends object,
  D extends OrmData<T> = OrmData<T>,
> implements ICrudEntityService<T, D>
{
  constructor(protected readonly em: EntityManager) {}

  /**
   * Assign data to the entity, not persisting it
   */
  protected async assign(entity: T, data?: D): Promise<T> {
    wrap(entity).assign(data || {}, {
      em: this.em,
    });

    return entity;
  }

  /**
   *
   * Override this method to provide custom creation logic
   *
   * Default Behavior:
   * Create a new entity based on the provided context
   * The entity is optional and can be provided to update a new created entity
   * If no fromEntity is provided a new entity is created
   *
   */
  async createOne(
    context: ICrudEntityServiceUpsertContext<T, D>,
    fromEntity?: T,
  ): Promise<T | null | undefined> {
    const entity = fromEntity || new context.classRef();
    await this.assign(entity, context.data);
    return entity;
  }

  /**
   * Override this method to provide custom update logic
   *
   * Assign data to the entity, not persisting it
   */
  async updateOne(
    entity: T,
    context: ICrudEntityServiceUpsertContext<T, D>,
  ): Promise<T | null | undefined> {
    await this.assign(entity, context.data);
    return entity;
  }
}
