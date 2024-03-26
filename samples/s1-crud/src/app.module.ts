import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  CreateOnePersonResolver,
  DeleteOnePersonResolver,
  FindManyPersonResolver,
  FinOneUserResolver,
  UpdateOnePersonResolver,
} from './app.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { join } from 'path';
import { CrudModule, ObjectRelationResolvers } from '@panter/crud';
import { Person } from './entities/person.entity';
import {
  AutocompleteCreateOneResolver,
  AutocompleteDeleteOneResolver,
  AutocompleteFindManyResolver,
  AutocompleteFindOneResolver,
  AutocompleteUpdateOneResolver,
} from './autocomplete.resolver';
import { AuthenticationModule } from './authentication/authentication.module';
import { getCorsOrigins } from '@panter/nestjs-utils';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserAuthority } from './authorization';
import mikroOrmConfig from '../mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        playground: false,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault({
            includeCookies: true,
          }),
        ],
        cors: {
          origin: getCorsOrigins(config),
          credentials: true,
        },
        context: ({ req, res }) => ({ req, res }),
      }),
    }),
    MikroOrmModule.forRoot({
      ...mikroOrmConfig,
    }),
    AuthenticationModule,
    AuthorizationModule.forRootAsync({ useFactory: async () => ({}) }),
    CrudModule.forRootAsync<UserAuthority>({
      useFactory: () => {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          auditCallback: ({ operation, resource, currentUser, data }) => {
            return;
          },
        };
      },
    }),
  ],
  providers: [
    FinOneUserResolver,
    FindManyPersonResolver,
    CreateOnePersonResolver,
    UpdateOnePersonResolver,
    DeleteOnePersonResolver,
    ...ObjectRelationResolvers(Person),
    AutocompleteFindOneResolver,
    AutocompleteFindManyResolver,
    AutocompleteCreateOneResolver,
    AutocompleteUpdateOneResolver,
    AutocompleteDeleteOneResolver,
  ],
})
export class AppModule {}
