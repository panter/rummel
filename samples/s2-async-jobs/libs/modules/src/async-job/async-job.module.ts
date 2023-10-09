import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AsyncJobConfig } from './async-job-config.entity';
import {
  AsyncJobConfigResolver,
  CreateOneAsyncJobConfigResolver,
  FindManyAsyncJobConfigResolver,
  FindOneAsyncJobConfigResolver,
  UpdateOneAsyncJobConfigResolver,
} from './async-job-config.resolver';
import { AsyncJobRunnerService } from '@app/modules/async-job/async-job-runner.service';
import { AsyncJobResolver } from '@app/modules/async-job/async-job.resolver';
import { GcpTaskQueueService } from '@app/modules/async-job/gcp-task-queue.service';
import { AsyncJobSchedulerService } from '@app/modules/async-job/async-job-scheduler.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [AsyncJobConfig] })],
  providers: [
    AsyncJobResolver,
    AsyncJobConfigResolver,
    CreateOneAsyncJobConfigResolver,
    UpdateOneAsyncJobConfigResolver,
    FindOneAsyncJobConfigResolver,
    FindManyAsyncJobConfigResolver,
    AsyncJobRunnerService,
    AsyncJobSchedulerService,
    GcpTaskQueueService,
  ],
  exports: [AsyncJobRunnerService, GcpTaskQueueService],
})
export class AsyncJobModule {}
