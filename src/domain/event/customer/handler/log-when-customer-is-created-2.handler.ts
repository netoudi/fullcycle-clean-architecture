import { type EventHandlerInterface } from '@app/domain/event/@shared/event-handler.interface';
import { type CustomerCreatedEvent } from '@app/domain/event/customer/customer-created.event';

export class LogWhenCustomerIsCreated2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('This is the second event console.log: CustomerCreated');
  }
}
