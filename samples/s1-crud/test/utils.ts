// import path from 'path';
import { MikroORM } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { ApolloDriver } from '@nestjs/apollo';
import { INestApplication, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Address } from '../src/entities/address.entity';
import { AppUser } from '../src/entities/app-user.entity';
import { Autocomplete } from '../src/entities/autocomplete.entity';
import { Organisation } from '../src/entities/organisation.entity';
import { Person } from '../src/entities/person.entity';
import { AppRole } from '../src/entities/role.entity';
import { Simple } from '../src/entities/simple.entity';
import { CrudModule } from '@panter/crud';
import { AuthenticationModule } from '../src/authentication/authentication.module';
import { AuthorizationModule } from '../src/authorization/authorization.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

export const TEST_TIMEOUT = 60000;

dotenv.config({ path: path.join(__dirname, '../', '.env') });

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
        entities: [
          Address,
          AppUser,
          Autocomplete,
          Organisation,
          Person,
          AppRole,
          Simple,
        ],
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
      AuthenticationModule,
      AuthorizationModule.forRootAsync({ useFactory: async () => ({}) }),
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
