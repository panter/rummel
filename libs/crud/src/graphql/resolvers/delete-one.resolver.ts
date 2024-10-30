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
  ICrudEntityService,
} from '../../';
import { CrudResource } from '../../service/crud-resource.decorator';
import { EntityIdInput } from '../generic-types';
import { gqlFilterToMikro } from '../gql-filter-to-mikro-orm';
import { AuthenticatedUser } from '../types';
import { getCrudInfosForType } from '../utils';

/**
 * Context type for the delete one resolver.
 *
 * @template T - The type of the entity.
 */
export type DeleteOneResolverContext<T> = {
  classRef: Type<T>;
  info: GraphQLResolveInfo;
  currentUser?: AuthenticatedUser | null | undefined;
  request: Express.Request;
  where?: EntityIdInput;
};

/**
 * The context type for the delete one resolver
 *
 * Usage:
 * ```ts
 * async method(context: DeleteOneResolverContextType<typeof YourEntity>) {
 *  // your code here
 * }
 * ```
 */
export type DeleteOneResolverContextType<E extends CrudEntityType> =
  E extends CrudEntityType<infer T> ? DeleteOneResolverContext<T> : never;

/**
 * Options for the delete one resolver.
 *
 * @template T - The type of the entity.
 */
export interface DeleteOneOptions<T> {
  name?: string;
  resolveCallback?: (
    args: DeleteOneResolverContext<T> & {
      em: EntityManager;
    },
  ) => Promise<T | null | undefined>;
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}

/**
 * Abstract class for delete one service.
 *
 * @template T - The type of the entity.
 * @template NA - The name of the entity.
 *
 * @param classRef - The reference to the entity class.
 * @param options - The options for the resolver.
 *
 * @returns The resolver class.
 */
function AbstractDeleteOneService<T extends object, NA extends string>(
  classRef: CrudEntityType<T, NA>,
  options: DeleteOneOptions<T> = {},
) {
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
     * Validate the context before deleting the entity.
     * Override this method to add custom validation logic.
     *
     * @param _context - The context for the delete operation.
     */
    async validateContext(
      _context: DeleteOneResolverContext<T>,
    ): Promise<void> {}

    /**
     * Resolve the response before returning it.
     * Override this method to customize the response.
     *
     * @param _context - The context for the delete operation.
     * @param result - The result of the delete operation.
     *
     * @returns The resolved response.
     */
    async resolveResponse<T>(
      _context: DeleteOneResolverContext<T>,
      result: T | null | undefined,
    ): Promise<T | null | undefined> {
      return result;
    }

    /**
     * Transform the input query to an ORM query.
     * Override this method to customize the transformation.
     *
     * @param context - The context for the delete operation.
     *
     * @returns The ORM query.
     */
    async getOrmQuery(
      context: DeleteOneResolverContext<T>,
    ): Promise<Record<string, any>> {
      const crudInfos = getCrudInfosForType(classRef);
      const ormQueryRaw =
        gqlFilterToMikro<T>({ id: context.where?.id }, crudInfos, {
          currentUser: context.currentUser,
        }) || {};

      return isArray(ormQueryRaw) ? ormQueryRaw[0] : ormQueryRaw;
    }

    /**
     * Find the entity to delete.
     * Override this method to customize the entity retrieval.
     *
     * @param context - The context for the delete operation.
     *
     * @returns The entity to delete.
     */
    async findEntity(context: DeleteOneResolverContext<T>): Promise<T> {
      const ormQuery = await this.getOrmQuery(context);
      return this.em.findOneOrFail(classRef, ormQuery);
    }

    /**
     * Delete the entity.
     * Override this method to completely replace the delete process.
     *
     * @param context - The context for the delete operation.
     *
     * @returns The deleted entity.
     */
    async deleteOne(
      context: DeleteOneResolverContext<T>,
    ): Promise<T | null | undefined> {
      await this.validateContext(context);
      const entityToDelete = await this.findEntity(context);
      await this.em.populate(
        entityToDelete,
        getFieldsToPopulate(context.info, classRef),
      );
      await this.em.removeAndFlush(entityToDelete);
      return await this.resolveResponse(context, entityToDelete);
    }
  }

  return Resolver;
}

/**
 * Update a resolver for delete a single entity
 *
 * Usage:
 *
 * ```ts
 * @Resolver(() => YourEntity)
 * export class DeleteOneYourEntityResolver extends DeleteOneResolver(YourEntity) {
 *   async validateContext(context: DeleteOneResolverContextType<typeof YourEntity>) {
 *     // your code here
 *   }
 * }
 * ```
 *
 * @param classRef - the entity class
 * @param options - the resolver options
 * @returns the resolver class
 */
export function DeleteOneResolver<T extends object, NA extends string>(
  classRef: CrudEntityType<T, NA>,
  options: DeleteOneOptions<T> = {},
) {
  const methodName = options.name || `deleteOne${classRef.name}`;

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractDeleteOneService(classRef, options) {
    constructor(
      public readonly em: EntityManager,
      public readonly crudEntityServiceFactory: CrudEntityServiceFactory,
    ) {
      super(em, crudEntityServiceFactory);
    }

    /**
     * Graphql Mutation Method
     *
     * This method is used as a mutation resolver for deleting a single entity
     * and should not be called directly.
     *
     * If you need to customize the delete process, you should override the
     * `findEntity` or `resolveResponse` method.
     *
     * @param info - GraphQL resolve info.
     * @param currentUser - The current authenticated user.
     * @param request - The current request.
     * @param where - The condition to find the entity to delete.
     */
    @Mutation(() => classRef, { name: methodName })
    async _deleteOneMutation(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
      @Args('where', { type: () => EntityIdInput })
      where?: EntityIdInput,
    ): Promise<T | null | undefined> {
      this.authorizeCallback?.({
        operation: 'delete',
        resource: classRef.name,
        currentUser,
        request,
        condition: where,
        em: this.em,
      });

      const context: DeleteOneResolverContext<T> = {
        info,
        currentUser,
        request,
        where,
        classRef,
      };

      let result: T | null | undefined;
      if (options.resolveCallback) {
        result = await options.resolveCallback({ ...context, em: this.em });
      } else {
        result = await this.deleteOne(context);
      }

      this.auditCallback?.({
        operation: 'delete',
        resource: classRef.name,
        currentUser,
        data: {
          id: where?.id,
        },
      });

      return result;
    }
  }

  return ConcreteResolver;
}
