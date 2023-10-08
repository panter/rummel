import { EntityManager } from '@mikro-orm/postgresql';
import { AbstractAsyncJob } from '@app/modules/async-job/abstract-async-job';
import { BlockUnverifiedUsersJob } from '@app/modules/user/block-unverified-users.job';
import { AsyncJobConfig } from '@app/modules/async-job/async-job-config.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AsyncJobRunnerService {
  constructor(private em: EntityManager) {}

  async runAsyncJob(jobId: string) {
    const jobConfig = await this.em.findOneOrFail(AsyncJobConfig, {
      id: jobId,
    });
    let job: AbstractAsyncJob;
    switch (jobConfig.name) {
      case 'BlockUnverifiedUsersJob': {
        job = new BlockUnverifiedUsersJob(this.em);
        break;
      }
      default: {
        throw new Error(`Unknown job name: ${jobConfig.name}`);
      }
    }
    await job.run(jobConfig);
    return true;
  }
}
