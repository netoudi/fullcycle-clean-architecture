import { type EventHandlerInterface } from '@app/domain/@shared/event/event-handler.interface';
import { type CustomerCreatedEvent } from '@app/domain/customer/event/customer-created.event';

export class LogWhenCustomerIsCreated1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('This is the first event console.log: CustomerCreated');
  }
}
