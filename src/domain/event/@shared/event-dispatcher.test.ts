import { EventDispatcher } from '@app/domain/event/@shared/event-dispatcher';
import { SendEmailWhenProductIsCreatedHandler } from '@app/domain/event/product/handler/send-email-when-product-is-created.handler';

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventHandler.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventHandler.getEventHandlers.ProductCreatedEvent.length).toBe(1);
  });
});
