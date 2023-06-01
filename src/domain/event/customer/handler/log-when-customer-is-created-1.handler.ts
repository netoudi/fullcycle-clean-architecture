import { type EventHandlerInterface } from '@app/domain/event/@shared/event-handler.interface';
import { type CustomerCreatedEvent } from '@app/domain/event/customer/customer-created.event';

export class LogWhenCustomerIsCreated1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('This is the first event console.log: CustomerCreated');
  }
}
