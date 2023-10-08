import { ApplicationException } from '@panter/nestjs-utils';

export class AsyncJobHandlerNotSpecifiedException extends ApplicationException {
  constructor(jobId: string) {
    super(
      'ASYNC_JOB_HANDLER_NOT_SPECIFIED',
      `Async job handler not specified for job ${jobId}.`,
    );
    this.withContext({ jobId });
  }
}
