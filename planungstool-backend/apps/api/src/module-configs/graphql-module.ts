import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlRequestContext } from '@panter/nestjs-utils';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export const graphqlModuleFactory = (options: {
  schemaFileName: string;
  path: string;
}) =>
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      autoSchemaFile: join(
        process.cwd(),
        `./generated/schema/${options.schemaFileName}`,
      ),
      playground: false,
      sortSchema: true,
      path: options.path,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      cors: {
        origin: getCorsOrigins(config),
        credentials: true,
      },
      context: ({
        req,
        res,
      }: ExpressContextFunctionArgument): GqlRequestContext => {
        return { req, res };
      },
    }),
  });

function getCorsOrigins(config: ConfigService): string[] {
  const whitelist: string[] = [];
  const frontendUrl = config.get<string>('FRONTEND_URL');
  if (frontendUrl) {
    whitelist.push(`${frontendUrl}`);
  }
  whitelist.push('https://studio.apollographql.com');
  return whitelist;
}
