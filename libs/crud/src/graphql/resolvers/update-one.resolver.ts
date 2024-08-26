import { EntityManager } from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import {
  CurrentRequest,
  CurrentUser,
  getFieldsToPopulate,
} from '@panter/nestjs-utils';
import { GraphQLResolveInfo } from 'graphql';
import { isArray } from 'lodash';
import {
  CrudAuditCallback,
  CrudAuthorizeCallback,
  CrudEntityServiceFactory,
  CrudEntityType,
  CrudGqlType,
  ICrudEntityService,
  OrmData,
} from '../../';
import { CrudResource } from '../../service/crud-resource.decorator';
import { EntityIdInput } from '../generic-types';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { gqlUpsertInputToOrm } from '../gql-upsert-input-to-mikro-orm';
import { AuthenticatedUser } from '../types';
import { upsertInput, UpsertInputName } from '../upsert-input';
import { getCrudInfosForType } from '../utils';

type UpdateOneResolverContext<T, D> = {
  classRef: Type<T>;
  info: GraphQLResolveInfo;
  currentUser?: AuthenticatedUser | null | undefined;
  request: Express.Request;
  /**
   * GraphQL input data
   */
  data?: D;
  where?: EntityIdInput;
};

/**
 * The context type for the update one resolver
 *
 * Usage:
 * ```ts
 * async method(context: UpdateOneResolverContextType<typeof YourEntity>) {
 *  // your code here
 * }
 * ```
 */
export type UpdateOneResolverContextType<E extends CrudEntityType> =
  E extends CrudEntityType<infer T, infer NA>
    ? UpdateOneResolverContext<
        T,
        CrudGqlType<UpsertInputName<NA, undefined, true>>
      >
    : never;

export interface UpdateOneOptions<T, D> {
  name?: string;
  resolveCallback?: (
    args: UpdateOneResolverContext<T, D> & {
      em: EntityManager;
    },
  ) => Promise<T | null | undefined>;
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}
function AbstractUpdateOneService<
  T extends object,
  NA extends string,
  D extends CrudGqlType<UpsertInputName<NA, undefined, true>>,
>(classRef: CrudEntityType<T, NA>, options: UpdateOneOptions<T, D> = {}) {
  abstract class Resolver {
    authorizeCallback?: CrudAuthorizeCallback = options.authorizeCallback;
    auditCallback?: CrudAuditCallback = options.auditCallback;
    crudEntityService: ICrudEntityService<T>;

    constructor(
      protected readonly em: EntityManager,
      crudEntityFactory: CrudEntityServiceFactory,
      pCrudEntityService?: ICrudEntityService<T>,
    ) {
      this.crudEntityService =
        pCrudEntityService || crudEntityFactory.getCrudService(classRef);
    }

    /**
     * Override this method to validate the context before creating the entity.
     * Throw an error if the context is invalid.
     *
     * By default, this method does nothing.
     *
     * @param _context
     */
    async validateContext(
      _context: UpdateOneResolverContext<T, D>,
    ): Promise<void> {}

    /**
     * Override this method to resolve the response before returning it.
     * This method is called after the entity is update, persisted and populated.
     *
     * @param context
     * @param result - the created entity
     * @param ormData - the data used to create the entity
     */
    async resolveResponse<T>(
      _context: UpdateOneResolverContext<T, D>,
      result: T | null | undefined,
      _ormData: OrmData<T>,
    ): Promise<T | null | undefined> {
      return result;
    }

    /**
     * Override this method to customize the transformation of the input query to a orm query.
     *
     * By default methods maps `context.where` to the orm query.
     *
     * @param context
     * @returns The orm query from the graphql query
     */
    async getOrmQuery(
      context: UpdateOneResolverContext<T, D>,
    ): Promise<Record<string, any>> {
      const crudInfos = getCrudInfosForType(classRef);
      const ormQueryRaw =
        gqlFilterToMikro<T>({ id: context.where?.id }, crudInfos, {
          currentUser: context.currentUser,
        }) || {};

      return isArray(ormQueryRaw) ? ormQueryRaw[0] : ormQueryRaw;
    }

    /**
     * Override this method to find the entity to update.
     *
     * By default methods finds the entity by the condition provided
     * by `getOrmQuery` function.
     *
     * @param context
     * @returns The entity to update
     */
    async findEntity(context: UpdateOneResolverContext<T, D>): Promise<T> {
      const ormQuery = await this.getOrmQuery(context);
      return this.em.findOneOrFail(classRef, ormQuery);
    }

    async getUpdateData(
      entity: T,
      context: UpdateOneResolverContext<T, D>,
    ): Promise<OrmData<T>> {
      return gqlUpsertInputToOrm(context.data, classRef, {
        em: this.em,
        currentUser: context.currentUser,
        currentOrmData: entity,
        rootOrmData: entity,
      });
    }

    /**
     * This method is called by the mutation resolver and offers a customizable
     * way to update an entity by overriding `findEntity` and/or `createEntity`.
     *
     * If you need to completely customize the creation process, you should override
     * this method.
     *
     * @param context
     * @returns the update entity
     */
    async updateOne(
      context: UpdateOneResolverContext<T, D>,
    ): Promise<T | null | undefined> {
      await this.validateContext(context);

      const entityToUpdate = await this.findEntity(context);
      const data = await this.getUpdateData(entityToUpdate, context);

      const entity = await this.crudEntityService.updateOne(entityToUpdate, {
        ...context,
        data,
      });

      if (entity) {
        await this.em.persistAndFlush(entity);
        await this.em.populate(
          entity,
          getFieldsToPopulate(context.info, classRef),
          {
            refresh: true,
          },
        );

        return await this.resolveResponse(context, entity, data);
      }
    }
  }

  return Resolver;
}

/**
 * Update a resolver for update a single entity
 *
 * Usage:
 *
 * ```ts
 * @Resolver(() => YourEntity)
 * export class UpdateOneYourEntityResolver extends UpdateOneResolver(YourEntity) {
 *   async validateContext(context: UpdateOneResolverContextType<typeof YourEntity>) {
 *     // your code here
 *   }
 * }
 * ```
 *
 * @param classRef - the entity class
 * @param options - the resolver options
 * @returns the resolver class
 */
export function UpdateOneResolver<
  T extends object,
  NA extends string,
  D extends CrudGqlType<UpsertInputName<NA, undefined, true>>,
>(classRef: CrudEntityType<T, NA>, options: UpdateOneOptions<T, D> = {}) {
  const methodName = options.name || `updateOne${classRef.name}`;
  const UpdateOneArg = upsertInput(classRef, { isUpdate: true });

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractUpdateOneService(classRef, options) {
    constructor(
      public readonly em: EntityManager,
      public readonly crudEntityServiceFactory: CrudEntityServiceFactory,
    ) {
      super(em, crudEntityServiceFactory);
    }

    /**
     * Graphql Mutation Method
     *
     * This method is used a mutation resolver for updating a single entity
     * and should not be called directly
     *
     * If you need to customize the update process, you should override the `createOne`,
     * `findEntity`, `getUpdateData` or resolveResponse method.
     *
     */
    @Mutation(() => classRef, { name: methodName })
    async _updateOneMutation(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
      @Args('data', {
        type: () => UpdateOneArg,
        nullable: true,
      })
      data?: D,
      @Args('where', { type: () => EntityIdInput })
      where?: EntityIdInput,
    ): Promise<T | null | undefined> {
      this.authorizeCallback?.({
        operation: 'update',
        resource: classRef.name,
        currentUser,
        request,
        data,
        condition: where,
        em: this.em,
      });

      const context: UpdateOneResolverContext<T, D> = {
        info,
        currentUser,
        request,
        data,
        where,
        classRef,
      };

      let result;
      if (options.resolveCallback) {
        result = await options.resolveCallback({ ...context, em: this.em });
      } else {
        result = await this.updateOne(context);
      }

      this.auditCallback?.({
        operation: 'update',
        resource: classRef.name,
        currentUser,
        data: {
          ...data,
        },
      });

      return result;
    }
  }

  return ConcreteResolver;
}
