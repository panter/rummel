import { ConfigService } from '@nestjs/config';

export const getCorsOrigins = (config: ConfigService): string[] => {
  const whitelist: string[] = [];
  const frontendUrl = config.get<string>('FRONTEND_URL');
  if (frontendUrl) {
    whitelist.push(`${frontendUrl}`);
  }
  whitelist.push('https://studio.apollographql.com');
  return whitelist;
};
