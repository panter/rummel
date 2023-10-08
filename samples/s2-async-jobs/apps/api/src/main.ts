import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const orm = app.get(MikroORM);
  await orm.getSchemaGenerator().refreshDatabase();
  // await orm.getSchemaGenerator().clearDatabase();
  await app.listen(3000);
}

bootstrap();
