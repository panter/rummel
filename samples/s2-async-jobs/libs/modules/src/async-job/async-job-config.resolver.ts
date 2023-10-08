import { Resolver } from '@nestjs/graphql';
import { AsyncJobConfig } from '@app/modules/async-job/async-job-config.entity';
import {
  CreateOneResolver,
  FindManyResolver,
  FindOneResolver,
  resolveCreateOne,
  UpdateOneResolver,
} from '@panter/crud';
import { getFieldsToPopulate } from '@panter/nestjs-utils';

@Resolver(() => AsyncJobConfig)
export class AsyncJobConfigResolver {}

@Resolver()
export class CreateOneAsyncJobConfigResolver extends CreateOneResolver(
  AsyncJobConfig,
  {
    onResolve: async (info, currentUser, em, data) => {
      const entity = await resolveCreateOne(AsyncJobConfig, data, {
        info,
        currentUser,
        persist: false,
        em,
      });

      await em.populate(entity, getFieldsToPopulate(info, AsyncJobConfig), {
        refresh: true,
      });
      return entity;
    },
  },
) {}

@Resolver()
export class UpdateOneAsyncJobConfigResolver extends UpdateOneResolver(
  AsyncJobConfig,
) {}

@Resolver()
export class FindOneAsyncJobConfigResolver extends FindOneResolver(
  AsyncJobConfig,
) {}

@Resolver()
export class FindManyAsyncJobConfigResolver extends FindManyResolver(
  AsyncJobConfig,
) {}
