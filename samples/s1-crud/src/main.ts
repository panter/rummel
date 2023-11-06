import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import * as cookieParser from 'cookie-parser';
import { AppInitSeeder } from './seeders/AppInitSeeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);
  //DON"T DO THIS IN PRODUCTION, it is just for samples purposes
  await orm.getSchemaGenerator().refreshDatabase();
  await orm.getSchemaGenerator().clearDatabase();
  await orm.getSeeder().seed(AppInitSeeder);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());
  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
