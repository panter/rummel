export interface IEventHandler<E> {
  handle(event: E): Promise<void>;
}
