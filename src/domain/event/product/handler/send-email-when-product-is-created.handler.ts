import { type EventHandlerInterface } from '@app/domain/event/@shared/event-handler.interface';
import { type ProductCreatedEvent } from '@app/domain/event/product/product-created.event';

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log('Sending email to...');
  }
}
