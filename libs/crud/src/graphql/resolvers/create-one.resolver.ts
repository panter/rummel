import {
  EntityData,
  EntityDTO,
  EntityManager,
  FromEntityType,
  wrap,
} from '@mikro-orm/postgresql';
import { Type } from '@nestjs/common';
import { Args, Info, Mutation, Resolver } from '@nestjs/graphql';
import {
  CurrentRequest,
  CurrentUser,
  getFieldsToPopulate,
} from '@panter/nestjs-utils';
import { GraphQLResolveInfo } from 'graphql';
import { CrudResource } from '../../crud-resource.decorator';
import { CrudAuditCallback, CrudAuthorizeCallback } from '../../types';
import { gqlUpsertInputToOrm } from '../gql-upsert-input-to-mikro-orm';
import { AuthenticatedUser } from '../types';
import { upsertInput } from '../upsert-input';
import { CrudEntityType } from '../crud-types';

export type ICreateOneContext<T, I> = {
  classRef: Type<T>;
  info: GraphQLResolveInfo;
  currentUser?: AuthenticatedUser | null | undefined;
  request: Express.Request;
  input?: I | null;
};

export interface ICreateOneOptions<T, I> {
  name?: string;
  resolveCallback?: (
    args: ICreateOneContext<T, I> & {
      em: EntityManager;
    },
  ) => Promise<T | null | undefined>;
  authorizeCallback?: CrudAuthorizeCallback;
  auditCallback?: CrudAuditCallback;
}

function AbstractCreateOneService<T extends object, Input extends object>(
  classRef: Type<T>,
  options: ICreateOneOptions<T, Input> = {},
) {
  abstract class Resolver {
    authorizeCallback?: CrudAuthorizeCallback = options.authorizeCallback;
    auditCallback?: CrudAuditCallback = options.auditCallback;

    constructor(readonly em: EntityManager) {}

    async initContext(
      input?: Input | null,
    ): Promise<{ input?: Input | null; entity: T }> {
      return { input, entity: new classRef() };
    }

    async resolveBefore(_context: ICreateOneContext<T, Input>): Promise<void> {
      // Custom logic before createOne can be placed here
    }

    async resolveBeforeFlush(
      _context: ICreateOneContext<T, Input>,
      result: T,
    ): Promise<T> {
      // Custom logic after createOne can be placed here
      return result;
    }

    async resolveAfterFlush(
      _context: ICreateOneContext<T, Input>,
      result: T | null | undefined,
    ): Promise<T | null | undefined> {
      // Custom logic after createOne can be placed here
      return result;
    }

    async getEntity(_context: ICreateOneContext<T, Input>): Promise<T> {
      return new classRef();
    }

    async getCreateData<
      Naked extends FromEntityType<T> = FromEntityType<T>,
      Data extends EntityData<Naked> | Partial<EntityDTO<Naked>> =
        | EntityData<Naked>
        | Partial<EntityDTO<Naked>>,
    >(entity: T, context: ICreateOneContext<T, Input>): Promise<Data> {
      return gqlUpsertInputToOrm(context.input || {}, classRef, {
        em: this.em,
        currentUser: context.currentUser,
        rootOrmData: entity,
      });
    }

    async createOne(
      initContext: ICreateOneContext<T, Input>,
    ): Promise<T | null | undefined> {
      await this.resolveBefore(initContext);

      const { input, entity: initEntity } = await this.initContext(
        initContext.input,
      );
      const context: ICreateOneContext<T, Input> = {
        ...initContext,
        input,
      };

      const createData: object = await this.getCreateData(initEntity, context);

      wrap(initEntity).assign(createData, { em: this.em });

      const entity = await this.resolveBeforeFlush(context, initEntity);

      await this.em.persistAndFlush(entity);
      await this.em.populate(
        entity,
        getFieldsToPopulate(context.info, classRef),
        {
          refresh: true,
        },
      );

      return await this.resolveAfterFlush(context, entity);
    }
  }

  return Resolver;
}

export function CreateOneResolver<
  T extends object,
  Input extends object,
  NA extends string,
>(classRef: CrudEntityType<T, NA>, options: ICreateOneOptions<T, Input> = {}) {
  const methodName = options.name || `createOne${classRef.name}`;
  const CreateOneArg = upsertInput(classRef);

  @CrudResource(classRef.name)
  @Resolver(() => classRef)
  class ConcreteResolver extends AbstractCreateOneService<T, Input>(
    classRef,
    options,
  ) {
    constructor(em: EntityManager) {
      super(em);
    }

    @Mutation(() => classRef, { name: methodName })
    async doCreateOne(
      @Info() info: GraphQLResolveInfo,
      @CurrentUser() currentUser: AuthenticatedUser,
      @CurrentRequest() request: Express.Request,
      @Args('data', {
        type: () => CreateOneArg,
        nullable: true,
      })
      data?: Input,
    ): Promise<T | null | undefined> {
      this.authorizeCallback?.({
        operation: 'create',
        resource: classRef.name,
        currentUser,
        request,
        data,
        em: this.em,
      });

      const context: ICreateOneContext<T, Input> = {
        info,
        currentUser,
        request,
        input: data,
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
