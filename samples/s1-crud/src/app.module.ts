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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          includeCookies: true,
        }),
      ],
    }),
    MikroOrmModule.forRoot(),
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
