import { Injectable } from '@nestjs/common';
import { GcpTaskQueueService } from '@app/modules/async-job/gcp-task-queue.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { AsyncJobConfig } from '@app/modules/async-job/async-job-config.entity';
import { AsyncJobHandlerNotSpecifiedException } from '@app/modules/async-job/async-job-handler-not-specified.exception';

@Injectable()
export class AsyncJobSchedulerService {
  constructor(
    private readonly taskQueueService: GcpTaskQueueService,
    private readonly em: EntityManager,
  ) {}

  async enqueueAsyncJob(jobId: string) {
    const config = await this.em.findOneOrFail(AsyncJobConfig, { id: jobId });
    if (!config.handlerUrl) {
      throw new AsyncJobHandlerNotSpecifiedException(jobId);
    }
    await this.taskQueueService.createTask(jobId, config.handlerUrl);
    return true;
  }
}
