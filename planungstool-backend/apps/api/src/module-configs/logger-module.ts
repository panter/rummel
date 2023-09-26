import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvShort, LoggerModule } from '@panter/nestjs-utils';
export const loggerModule = LoggerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const env = config.getOrThrow<EnvShort>('ENV_SHORT');
    return {
      env,
    };
  },
});
