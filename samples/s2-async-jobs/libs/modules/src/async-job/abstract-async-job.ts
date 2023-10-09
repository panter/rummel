import { EntityManager } from '@mikro-orm/postgresql';
import { Transactional } from '@panter/nestjs-utils';
import { AsyncJobConfig } from '@app/modules/async-job/async-job-config.entity';
import { Logger } from '@nestjs/common';

export abstract class AbstractAsyncJob {
  private internalLogger = new Logger(AbstractAsyncJob.name);

  protected constructor(protected readonly em: EntityManager) {}

  protected abstract execute(config: AsyncJobConfig): Promise<void>;

  @Transactional()
  async run(config: AsyncJobConfig): Promise<void> {
    this.internalLogger.debug(
      `Running job ${config.name} (${config.label})...`,
    );
    try {
      await this.execute(config);
    } catch (e) {
      this.internalLogger.error(e);
      this.internalLogger.error(`Job ${config.name} (${config.label}) failed.`);
    }
    this.internalLogger.debug(`Job ${config.name} (${config.label}) finished.`);
  }
}
