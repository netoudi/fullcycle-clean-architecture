import { type EventInterface } from '@app/domain/event/@shared/event.interface';

export interface EventHandlerInterface<T extends EventInterface = EventInterface> {
  handle: (event: T) => void;
}
