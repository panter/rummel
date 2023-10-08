import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ModulesModule } from '@app/modules';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '@generated/schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          includeCookies: true,
        }),
      ],
    }),
    ModulesModule,
  ],
})
export class ApiModule {}
