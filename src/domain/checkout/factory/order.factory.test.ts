import { randomUUID } from 'node:crypto';
import { OrderFactory, type OrderFactoryCreateProps } from '@app/domain/checkout/factory/order.factory';

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps: OrderFactoryCreateProps = {
      id: randomUUID(),
      customerId: randomUUID(),
      items: [
        {
          id: randomUUID(),
          name: 'Product 1',
          productId: randomUUID(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
