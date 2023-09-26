import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { ConfigModule, ConfigService } from '@nestjs/config';

const logger = new Logger('MikroORM');

export const mikroOrmModule = MikroOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const isLocalEnv =
      configService.get<string>('ENV_SHORT', 'local') === 'local';
    // TODO: this should be remove as soon as catladder provides a compatible `DATABASE_URL` env var
    const dbConfig = isLocalEnv
      ? {
          clientUrl: configService.getOrThrow<string>('DATABASE_URL'),
        }
      : {
          dbName: configService.getOrThrow<string>('DB_NAME'),
          host: `/cloudsql/${configService.getOrThrow<string>(
            'CLOUD_SQL_INSTANCE_CONNECTION_NAME',
          )}`,
          password: configService.getOrThrow<string>('DB_PASSWORD'),
        };
    return {
      ...dbConfig,
      metadataProvider: TsMorphMetadataProvider,
      type: 'postgresql',
      schema: 'public',
      logger: logger.log.bind(logger),
      highlighter: isLocalEnv ? new SqlHighlighter() : undefined,
      autoLoadEntities: true,
      debug: true,
    };
  },
});
