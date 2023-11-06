import { Module, UnauthorizedException } from '@nestjs/common';
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
import { AppAbility, PermissionAction } from './authorization/interfaces/types';
import { subject } from '@casl/ability';

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
    AuthorizationModule.forRootAsync({ useFactory: async () => ({}) }),
    CrudModule.forRootAsync({
      authorizeCallback: ({
        operation,
        resource,
        currentUser,
        request,
        data,
      }) => {
        //TODO: body has to be refactored to work in general
        console.log(
          `operation: ${operation}, resource: ${resource}, currentUser: ${currentUser.id}, data: ${data}`,
        );
        const ability: AppAbility = (<any>request).ability;
        if (
          !ability?.can(
            operation as PermissionAction,
            subject(resource, { id: data?.where.id }),
          )
        ) {
          throw new UnauthorizedException();
        }
        return true;
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
