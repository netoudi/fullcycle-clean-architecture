describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventHandler.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventHandler.getEventHandlers.ProductCreatedEvent.length).toBe(1);
  });
});
