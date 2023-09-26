import { SetMetadata } from '@nestjs/common';

export const EVENT_HANDLER = 'EventHandler';

export const EventHandler = (event: string) =>
  SetMetadata(EVENT_HANDLER, event);
