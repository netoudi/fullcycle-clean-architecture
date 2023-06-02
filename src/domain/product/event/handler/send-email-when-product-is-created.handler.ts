import { type EventHandlerInterface } from '@app/domain/@shared/event/event-handler.interface';
import { type ProductCreatedEvent } from '@app/domain/product/event/product-created.event';

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log('Sending email to...');
  }
}
