import { Module } from '@nestjs/common';
import { AsyncJobRunnerController } from './async-job-runner.controller';
import { ModulesModule } from '@app/modules';

@Module({
  imports: [ModulesModule],
  controllers: [AsyncJobRunnerController],
})
export class AsyncJobRunnerModule {}
