import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from '../twilio';
import { SmsService } from './sms.service';
import { TwilioSmsService } from './twilio-sms.service';
import { LocalSmsService } from './local-sms.service';
import { EnvShort } from '../../common';

@Global()
@Module({
  providers: [
    {
      inject: [ConfigService, TwilioService],
      provide: SmsService,
      useFactory: (config: ConfigService, twilio: TwilioService) => {
        const env = config.getOrThrow<EnvShort>('ENV_SHORT');
        if (env === EnvShort.prod) {
          return new TwilioSmsService(twilio);
        } else {
          return new LocalSmsService();
        }
      },
    },
  ],
  exports: [SmsService],
})
export class SmsModule {}
