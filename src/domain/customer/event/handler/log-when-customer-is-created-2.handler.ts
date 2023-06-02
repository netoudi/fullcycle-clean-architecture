import { type EventHandlerInterface } from '@app/domain/@shared/event/event-handler.interface';
import { type CustomerCreatedEvent } from '@app/domain/customer/event/customer-created.event';

export class LogWhenCustomerIsCreated2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('This is the second event console.log: CustomerCreated');
  }
}
