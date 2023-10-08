import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { EnvShort } from '../../common';
import { SendInBlueEmailService } from './send-in-blue-email.service';
import { LocalEmailService } from './local-email.service';

export class EmailModule {
  static async forRootAsync(): Promise<DynamicModule> {
    return {
      module: EmailModule,
      global: true,
      providers: [
        {
          inject: [ConfigService],
          provide: EmailService,
          useFactory: async (config: ConfigService) => {
            const env = config.getOrThrow<EnvShort>('ENV_SHORT');
            if (env === EnvShort.prod) {
              return new SendInBlueEmailService({
                apiKey: config.getOrThrow('SIB_API_KEY'),
                noReplyEmail: config.getOrThrow('VELOCLICK_NO_REPLY_EMAIL'),
                creditEmail: config.getOrThrow('VELOCLICK_CREDIT_EMAIL'),
                abuseEmail: config.getOrThrow('VELOCLICK_ABUSE_EMAIL'),
              });
            } else {
              return new LocalEmailService({
                noReplyEmail: config.get(
                  'VELOCLICK_NO_REPLY_EMAIL',
                  'no-reply@example.com',
                ),
                creditEmail: config.get(
                  'VELOCLICK_CREDIT_EMAIL',
                  'credit@example.com',
                ),
                abuseEmail: config.get(
                  'VELOCLICK_ABUSE_EMAIL',
                  "abuse@example.com'",
                ),
              });
            }
          },
        },
      ],
      exports: [EmailService],
    };
  }
}
