import { Address } from '@app/domain/entity/address';
import { Customer } from '@app/domain/entity/customer';
import { EventDispatcher } from '@app/domain/event/@shared/event-dispatcher';
import { CustomerAddressChangedEvent } from '@app/domain/event/customer/customer-address-changed.event';
import { CustomerCreatedEvent } from '@app/domain/event/customer/customer-created.event';
import { LogWhenCustomerAddressIsChangedHandler } from '@app/domain/event/customer/handler/log-when-customer-address-is-changed.handler';
import { LogWhenCustomerIsCreated1Handler } from '@app/domain/event/customer/handler/log-when-customer-is-created-1.handler';
import { LogWhenCustomerIsCreated2Handler } from '@app/domain/event/customer/handler/log-when-customer-is-created-2.handler';
import { SendEmailWhenProductIsCreatedHandler } from '@app/domain/event/product/handler/send-email-when-product-is-created.handler';
import { ProductCreatedEvent } from '@app/domain/event/product/product-created.event';

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers).toMatchObject({});
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product name',
      description: 'Product description',
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it('should notify when customer is created', () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new LogWhenCustomerIsCreated1Handler();
    const eventHandler2 = new LogWhenCustomerIsCreated2Handler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(eventHandler2);

    const customer = new Customer('111', 'John Doe');

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it('should notify when customer address is changed', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new LogWhenCustomerAddressIsChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.CustomerAddressChangedEvent[0]).toMatchObject(eventHandler);

    const customer = new Customer('111', 'John Doe');
    customer.changeAddress(new Address('Street', '1', '12345-678', 'New York'));

    const customerAddressChanged = new CustomerAddressChangedEvent(customer);

    eventDispatcher.notify(customerAddressChanged);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
