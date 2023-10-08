import { NestFactory } from '@nestjs/core';
import { AsyncJobRunnerModule } from './async-job-runner.module';
import * as ff from '@google-cloud/functions-framework';

async function bootstrap() {
  const app = await NestFactory.create(AsyncJobRunnerModule);
  await app.init();
  return app.getHttpAdapter().getInstance();
}

ff.http('async-job-runner', async (req: ff.Request, res: ff.Response) => {
  const expressInstance = await bootstrap();
  expressInstance(req, res);
});
