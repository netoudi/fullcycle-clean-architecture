import { type EventDispatcherInterface } from '@app/domain/event/@shared/event-dispatcher.interface';
import { type EventHandlerInterface } from '@app/domain/event/@shared/event-handler.interface';
import { type EventInterface } from '@app/domain/event/@shared/event.interface';

export class EventDispatcher implements EventDispatcherInterface {
  notify(event: EventInterface): void {
    //
  }

  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    //
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    //
  }

  unregisterAll(): void {
    //
  }
}
