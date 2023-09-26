import { ModuleAsyncOptions } from '../../common';

export interface TwilioModuleOptions {
  accountSid: string;
  authToken: string;
  verifyServiceSid: string;
  messagingServiceSid: string;
}

export type TwilioModuleAsyncOptions = ModuleAsyncOptions<TwilioModuleOptions>;
