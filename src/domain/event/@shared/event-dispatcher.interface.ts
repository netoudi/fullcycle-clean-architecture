import { type EventHandlerInterface } from '@app/domain/event/@shared/event-handler.interface';
import { type EventInterface } from '@app/domain/event/@shared/event.interface';

export interface EventDispatcherInterface {
  notify: (event: EventInterface) => void;
  register: (eventName: string, eventHandler: EventHandlerInterface) => void;
  unregister: (eventName: string, eventHandler: EventHandlerInterface) => void;
  unregisterAll: () => void;
}
