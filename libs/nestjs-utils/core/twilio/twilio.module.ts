import { DynamicModule } from '@nestjs/common';
import { TWILIO_MODULE_OPTIONS } from './twilio-module-constants';
import {
  TwilioModuleAsyncOptions,
  TwilioModuleOptions,
} from './twilio-module-options';
import { TwilioService } from './twilio.service';
import { InvalidConfigurationException } from '../../common';

export class TwilioModule {
  static async forRootAsync({
    useFactory,
    inject,
  }: TwilioModuleAsyncOptions): Promise<DynamicModule> {
    return {
      module: TwilioModule,
      global: true,
      providers: [
        {
          provide: TWILIO_MODULE_OPTIONS,
          inject,
          useFactory,
        },
        {
          provide: TwilioService,
          inject,
          useFactory: async (...args) => {
            const options = await useFactory(...args);
            this.validateOptions(options);
            return new TwilioService(options);
          },
        },
      ],
      exports: [TwilioService],
    };
  }

  private static validateOptions(options: TwilioModuleOptions) {
    if (!options.authToken) {
      throw new InvalidConfigurationException(
        "Mandatory option 'authToken' was not provided",
      );
    }
    if (!options.accountSid) {
      throw new InvalidConfigurationException(
        "Mandatory option 'accountSid' was not provided",
      );
    }
    if (!options.verifyServiceSid) {
      throw new InvalidConfigurationException(
        "Mandatory option 'verifyServiceSid' was not provided",
      );
    }
  }
}
