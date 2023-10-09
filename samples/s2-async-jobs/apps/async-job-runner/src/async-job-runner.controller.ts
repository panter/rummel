import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AsyncJobRunnerService } from '@app/modules/async-job/async-job-runner.service';

@Controller()
export class AsyncJobRunnerController {
  private readonly logger = new Logger(AsyncJobRunnerController.name);

  constructor(private runner: AsyncJobRunnerService) {}

  @Post('/run')
  async run(@Body() body: any): Promise<void> {
    const jobId = body?.jobId;
    if (!jobId) {
      throw new Error('jobId is required');
    }
    this.logger.log(`Job ${jobId} started`);
    await this.runner.runAsyncJob(jobId);
    this.logger.log(`Job ${jobId} finished`);
  }
}
