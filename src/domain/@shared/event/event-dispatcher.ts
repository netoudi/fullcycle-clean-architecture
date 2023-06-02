import { type EventDispatcherInterface } from '@app/domain/@shared/event/event-dispatcher.interface';
import { type EventHandlerInterface } from '@app/domain/@shared/event/event-handler.interface';
import { type EventInterface } from '@app/domain/@shared/event/event.interface';

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: Record<string, EventHandlerInterface[]> = {};

  get getEventHandlers(): Record<string, EventHandlerInterface[]> {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
