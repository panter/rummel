import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../fixtures/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { INestApplication, Provider } from '@nestjs/common';
import { Group } from '../fixtures/group.entity';
import { Company } from '../fixtures/company.entity';
import { CrudModule } from '../../src';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { MikroORM } from '@mikro-orm/core';

export const TEST_TIMEOUT = 60000;

export interface TestContext {
  app: INestApplication;
  pgContainer: StartedPostgreSqlContainer;
  orm: MikroORM;
}

export const beforeAllCallback = async (
  providers: Provider[],
): Promise<TestContext> => {
  const pgContainer = await new PostgreSqlContainer()
    .withStartupTimeout(TEST_TIMEOUT)
    .start();
  const fixture = await Test.createTestingModule({
    imports: [
      MikroOrmModule.forRoot({
        driver: PostgreSqlDriver,
        host: pgContainer.getHost(),
        port: pgContainer.getPort(),
        user: pgContainer.getUsername(),
        password: pgContainer.getPassword(),
        dbName: pgContainer.getDatabase(),
        extensions: [Migrator, SeedManager],
        entities: [User, Group, Company],
        logger: (i) => i,
        migrations: {
          path: 'test/e2e/migrations',
          snapshot: false,
        },
      }),
      GraphQLModule.forRoot({
        driver: ApolloDriver,
        autoSchemaFile: true,
        buildSchemaOptions: {
          skipCheck: true,
        },
      }),
      CrudModule.forRootAsync({
        useFactory: () => {
          return {};
        },
      }),
    ],
    providers: [...providers],
  }).compile();
  const app = fixture.createNestApplication({ bodyParser: true });
  const orm = app.get(MikroORM);

  await orm.getMigrator().up();
  const migrationNeeded = await orm.getMigrator().checkMigrationNeeded();

  if (migrationNeeded) {
    await orm.getMigrator().createMigration();
    await orm.getMigrator().up();
  }

  await app.init();
  return { app, pgContainer, orm: orm as any };
};

export const afterAllCallback = async (context: TestContext) => {
  await context?.orm?.close(true);
  await context?.app?.close();
  await context?.pgContainer?.stop();
};
