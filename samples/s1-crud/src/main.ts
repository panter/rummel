import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);
  //DON"T DO THIS IN PRODUCTION, it is just for samples purposes
  await orm.getSchemaGenerator().refreshDatabase();
  await orm.getSchemaGenerator().clearDatabase();
  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
