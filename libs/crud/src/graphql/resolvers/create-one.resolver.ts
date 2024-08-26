import { EntityManager } from '@mikro-orm/postgresql';

import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import {
  CurrentRequest,
  CurrentUser,
  getFieldsToPopulate,
} from '@panter/nestjs-utils';
import { GraphQLResolveInfo } from 'graphql';
import {
  CrudAuditCallback,
  CrudAuthorizeCallback,
  CrudEntityServiceFactory,
  ICrudEntityService,
  OrmData,
  CrudEntityType,
  CrudGqlType,
} from '../../';
import { CrudResource } from '../../service/crud-resource.decorator';
import { gqlUpsertInputToOrm } from '../gql-upsert-input-to-mikro-orm';
import { AuthenticatedUser } from '../types';
import { upsertInput, UpsertInputName } from '../upsert-input';

export type CreateOneResolverContext<T, D> = {
  classRef: Type<T>;
  info: GraphQLResolveInfo;
  currentUser?: AuthenticatedUser | null | undefined;
  request: Express.Request;
  /**
   * GraphQL input data
   */
  data?: D | null;
};

/**
 * The context type for the create one resolver
 *
 * Usage:
 * ```ts
 * async method(context: CreateOneResolverContextType<typeof YourEntity>) {
 *  // your code here
 * }
 * ```
 */
export type CreateOneResolverContextType<E extends CrudEntityType> =
  E extends CrudEntityType<infer T, infer NA>
    ? CreateOneResolverContext<
        T,
        CrudGqlType<UpsertInputName<NA, undefined, false>>
      >
    : never;

export interface CreateOneOptions<T, D> {
  name?: string;
  resolveCallback?: (
    args: CreateOneResolverContext<T, D> & {
      em: EntityManager;
    },
  ) => Promise<T | null | undefined>;
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}

function AbstractCreateOneService<
  T extends object,
  NA extends string,
  D extends CrudGqlType<UpsertInputName<NA, undefined, false>>,
>(classRef: CrudEntityType<T>, options: CreateOneOptions<T, D> = {}) {
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
      _context: CreateOneResolverContext<T, D>,
    ): Promise<void> {}

    /**
     * Override this method to customize the transformation of the input data to orm data.
     *
     * By default methods the mapped input data to orm data.
     *
     * @param context
     * @returns By default methods the mapped input data to orm data.
     */
    async getCreateData(
      context: CreateOneResolverContext<T, D>,
    ): Promise<OrmData<T>> {
      const ormData = await gqlUpsertInputToOrm(context.data || {}, classRef, {
        em: this.em,
        currentUser: context.currentUser,
      });

      return ormData;
    }

    /**
     * Override this method to create the entity with the provided 'ormData' before persisting it.
     * This method is called after the data is transformed to orm data.
     *
     * If 'undefined' is returned, the entity is created by the default
     * behavior in the 'CrudEntityService'.
     *
     * This method return 'undefined' by default.
     *
     * @param context
     * @param ormData - the data used to create the entity
     */
    async createEntity(
      _context: CreateOneResolverContext<T, D>,
      _ormData: OrmData<T>,
    ): Promise<T | undefined> {
      return undefined;
    }

    /**
     * Override this method to resolve the response before returning it.
     * This method is called after the entity is created, persisted and populated.
     *
     * @param context
     * @param result - the created entity
     * @param ormData - the data used to create the entity
     */
    async resolveResponse(
      _context: CreateOneResolverContext<T, D>,
      result: T | null | undefined,
      _ormData: OrmData<T>,
    ): Promise<T | null | undefined> {
      return result;
    }

    /**
     * This method is called by the mutation resolver and offers a customizable
     * way to create an entity by overriding `getCreateData` and/or `createEntity`.
     *
     * If you need to completely customize the creation process, you should override
     * this method.
     *
     * @param context
     * @returns the created entity
     */
    async createOne(
      context: CreateOneResolverContext<T, D>,
    ): Promise<T | null | undefined> {
      await this.validateContext(context);

      const data = await this.getCreateData(context);
      const fromEntity = await this.createEntity(context, data);
      const entity = await this.crudEntityService.createOne(
        {
          ...context,
          data,
        },
        fromEntity,
      );

      if (entity) {
        await this.em.persistAndFlush(entity);
        await this.em.populate(
          entity,
          getFieldsToPopulate(context.info, classRef),
          {
            refresh: true,
          },
        );
        return entity;
      }
      return await this.resolveResponse(context, entity, data);
    }
  }

  return Resolver;
}

/**
 * Create a resolver for creating a single entity
 *
 * Usage:
 *
 * ```ts
 * @Resolver(() => YourEntity)
 * export class CreateOneYourEntityResolver extends CreateOneResolver(YourEntity) {
 *   async createEntity(context: CreateOneResolverContextType<typeof YourEntity>, ormData: OrmData<YourEntity>) {
 *     // your code here
 *   }
 * }
 * ```
 *
 * @param classRef - the entity class
 * @param options - the resolver options
 * @returns the resolver class
 */
export function CreateOneResolver<
  T extends object,
  NA extends string,
  D extends CrudGqlType<UpsertInputName<NA, undefined, false>>,
>(classRef: CrudEntityType<T, NA>, options: CreateOneOptions<T, D> = {}) {
  const methodName = options.name || `createOne${classRef.name}`;
  const CreateOneArg = upsertInput(classRef);

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractCreateOneService(classRef, options) {
    constructor(
      public readonly em: EntityManager,
      public readonly crudEntityFactory: CrudEntityServiceFactory,
    ) {
      super(em, crudEntityFactory);
    }

    /**
     * Graphql Mutation Method
     *
     * This method is used a mutation resolver for creating a single entity
     * and should not be called directly
     *
     * If you need to customize the creation process, you should override the `createOne`,
     * `getCreateData`, `createEntity` or `resolveResponse` methods
     */
    @Mutation(() => classRef, { name: methodName })
    async _createOneMutation(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
      @Args('data', {
        type: () => CreateOneArg,
        nullable: true,
      })
      data?: D,
    ): Promise<T | null | undefined> {
      this.authorizeCallback?.({
        operation: 'create',
        resource: classRef.name,
        currentUser,
        request,
        data,
        em: this.em,
      });

      const context: CreateOneResolverContext<T, D> = {
        info,
        currentUser,
        request,
        data,
        classRef,
      };
      let result;
      if (options.resolveCallback) {
        result = await options.resolveCallback({ ...context, em: this.em });
      } else {
        result = await this.createOne(context);
      }

      this.auditCallback?.({
        operation: 'create',
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
