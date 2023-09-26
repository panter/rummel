import { Injectable } from '@nestjs/common';
import { IEventHandler } from './event-handler.interface';

@Injectable()
export class EventBusService {
  readonly map: Map<string, Set<IEventHandler<unknown>>> = new Map<
    string,
    Set<IEventHandler<unknown>>
  >();

  registerHandler(eventName: string, handler: IEventHandler<unknown>) {
    let eventHandlers = this.map.get(eventName);
    if (!eventHandlers) {
      eventHandlers = new Set<IEventHandler<unknown>>();
      this.map.set(eventName, eventHandlers);
    }
    eventHandlers.add(handler);
  }

  async publish<E>(eventName: string, event: E) {
    if (!this.map.has(eventName)) return;
    const handlers = this.map.get(eventName)?.values() || [];

    const eventHandlerPromises = Array.from(handlers).map((handler) =>
      handler.handle(event),
    );

    await Promise.all(eventHandlerPromises);
  }
}
