import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  CreateOneUserResolver,
  DeleteOneUserResolver,
  FindManyUserResolver,
  FinOneUserResolver,
  UpdateOneUserResolver,
} from './app.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { join } from 'path';
import { ObjectRelationResolvers } from '@panter/crud';
import { Person } from './entities/person.entity';
import {
  AutocompleteCreateOneResolver,
  AutocompleteDeleteOneResolver,
  AutocompleteFindManyResolver,
  AutocompleteFindOneResolver,
  AutocompleteUpdateOneResolver,
} from './autocomplete.resolver';
import { CRUDModule } from './crud.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { getCorsOrigins } from '@panter/nestjs-utils';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
    MikroOrmModule.forRoot(),
    AuthenticationModule,
    CRUDModule.forRootAsync({
      authorizeCallback: (operation, resource, currentUser, data) => {
        console.log(
          `operation: ${operation}, resource: ${resource}, currentUser: ${currentUser.id}, data: ${data}`,
        );
        return true;
      },
    }),
  ],
  providers: [
    FinOneUserResolver,
    FindManyUserResolver,
    CreateOneUserResolver,
    UpdateOneUserResolver,
    DeleteOneUserResolver,
    ...ObjectRelationResolvers(Person),
    AutocompleteFindOneResolver,
    AutocompleteFindManyResolver,
    AutocompleteCreateOneResolver,
    AutocompleteUpdateOneResolver,
    AutocompleteDeleteOneResolver,
  ],
})
export class AppModule {}
