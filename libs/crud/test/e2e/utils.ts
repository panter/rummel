import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../fixtures/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { MikroORM } from '@mikro-orm/core';
import { CreateOneUserResolver } from './create-one-user.resolver.e2e-spec';
import { INestApplication } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export interface TestContext {
  app: INestApplication;
  pgContainer: StartedPostgreSqlContainer;
  orm: MikroORM<PostgreSqlDriver>;
}

export const beforeAllCallback = async (): Promise<TestContext> => {
  const pgContainer = await new PostgreSqlContainer().start();
  const fixture = await Test.createTestingModule({
    imports: [
      MikroOrmModule.forRoot({
        type: 'postgresql',
        host: pgContainer.getHost(),
        port: pgContainer.getMappedPort(5432),
        user: pgContainer.getUsername(),
        password: pgContainer.getPassword(),
        dbName: pgContainer.getDatabase(),
        entities: [User],
        migrations: {
          path: 'test/e2e/migrations',
        },
      }),
      GraphQLModule.forRoot({
        driver: ApolloDriver,
        autoSchemaFile: true,
        buildSchemaOptions: {
          skipCheck: true,
        },
      }),
    ],
    providers: [CreateOneUserResolver],
  }).compile();
  const app = fixture.createNestApplication({ bodyParser: true });
  const orm = app.get(MikroORM<PostgreSqlDriver>);
  
  await orm.getMigrator().up();
  const migrationNeeded = await orm.getMigrator().checkMigrationNeeded();
  if (migrationNeeded) {
    await orm.getMigrator().createMigration();
    await orm.getMigrator().up();
  }
  await app.init();
  return { app, pgContainer, orm };
};

export const afterAllCallback = async (context: TestContext) => {
  await context.pgContainer.stop();
  await context.app.close();
};
