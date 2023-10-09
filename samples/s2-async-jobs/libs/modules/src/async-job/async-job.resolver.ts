import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AsyncJobSchedulerService } from '@app/modules/async-job/async-job-scheduler.service';

@Resolver()
export class AsyncJobResolver {
  constructor(private readonly jobScheduler: AsyncJobSchedulerService) {}

  @Mutation(() => Boolean)
  async enqueueAsyncJob(@Args('jobId') jobId: string) {
    return this.jobScheduler.enqueueAsyncJob(jobId);
  }
}
