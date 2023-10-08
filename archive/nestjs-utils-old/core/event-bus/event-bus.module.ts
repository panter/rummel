import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { IEventHandler } from './event-handler.interface';
import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { EventBusService } from './event-bus.service';
import { EVENT_HANDLER } from './event-handler.decorator';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [EventBusService],
  exports: [EventBusService],
})
export class EventBusModule implements OnModuleInit {
  private readonly logger = new Logger(EventBusModule.name);

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): any {
    const wrappers = this.discovery.getProviders();

    const eventHandlers = wrappers
      .filter(
        (wrapper) =>
          wrapper.metatype &&
          Reflect.getMetadata(EVENT_HANDLER, wrapper.metatype),
      )
      .map((wrapper) => {
        return {
          name: Reflect.getMetadata(EVENT_HANDLER, wrapper.metatype),
          handler: wrapper.instance as IEventHandler<unknown>,
        };
      });

    eventHandlers.forEach((eh) => {
      this.logger.debug(
        `Registering event '${eh.handler.constructor.name}' handler for event '${eh.name}'`,
      );
      this.eventBus.registerHandler(eh.name, eh.handler);
    });
  }
}
