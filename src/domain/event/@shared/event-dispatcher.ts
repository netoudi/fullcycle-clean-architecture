import { type EventDispatcherInterface } from '@app/domain/event/@shared/event-dispatcher.interface';
import { type EventHandlerInterface } from '@app/domain/event/@shared/event-handler.interface';
import { type EventInterface } from '@app/domain/event/@shared/event.interface';

export class EventDispatcher implements EventDispatcherInterface {
  private readonly eventHandlers: Record<string, EventHandlerInterface[]> = {};

  get getEventHandlers(): Record<string, EventHandlerInterface[]> {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    //
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    //
  }

  unregisterAll(): void {
    //
  }
}
