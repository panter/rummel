import { MikroORM } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { ApolloDriver } from '@nestjs/apollo';
import { INestApplication, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { v4 } from 'uuid';
import { CrudModule } from '../../src';
import { Company } from '../fixtures/company.entity';
import { Group } from '../fixtures/group.entity';
import { User } from '../fixtures/user.entity';

export const TEST_TIMEOUT = 20000;

export interface TestContext {
  app: INestApplication;
  orm: MikroORM;
}

export const beforeEachCallback = async (
  providers: Provider[],
): Promise<TestContext> => {
  const schema = v4();
  // create schema
  const pgContainer = global.pgContainer;
  await pgContainer.exec(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
  const fixture = await Test.createTestingModule({
    imports: [
      MikroOrmModule.forRoot({
        driver: PostgreSqlDriver,
        host: pgContainer.getHost(),
        port: pgContainer.getPort(),
        user: pgContainer.getUsername(),
        password: pgContainer.getPassword(),
        dbName: pgContainer.getDatabase(),
        schema,
        extensions: [Migrator, SeedManager],
        entities: [User, Group, Company],
        logger: (i) => i,
        migrations: {
          path: `test/e2e/migrations/${schema}`,
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
  return { app, orm: orm as any };
};

export const afterEachCallback = async (context: TestContext) => {
  await context?.orm.getSchemaGenerator().dropSchema();
  await context?.orm?.close(true);
  await context?.app?.close();
};
