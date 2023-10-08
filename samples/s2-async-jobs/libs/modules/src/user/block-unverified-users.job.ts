import { AbstractAsyncJob } from '@app/modules/async-job/abstract-async-job';
import { AsyncJobConfig } from '@app/modules/async-job/async-job-config.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';

export class BlockUnverifiedUsersJob extends AbstractAsyncJob {
  private readonly logger = new Logger(BlockUnverifiedUsersJob.name);

  constructor(protected readonly em: EntityManager) {
    super(em);
  }

  async execute(config: AsyncJobConfig) {
    this.logger.debug(JSON.stringify(config, null, 2));
  }
}
