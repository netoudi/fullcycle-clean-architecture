import { Order } from '@app/domain/checkout/entity/order';
import { OrderItem } from '@app/domain/checkout/entity/order_item';
import { OrderService } from '@app/domain/checkout/service/order.service';
import { Customer } from '@app/domain/customer/entity/customer';

describe('OrderService unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'John Doe');
    const item = new OrderItem('i1', 'Item 1', 'p1', 10, 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it('should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'Item 1', 'p1', 100, 1);
    const item2 = new OrderItem('i2', 'Item 2', 'p2', 200, 2);

    const order1 = new Order('o1', 'c1', [item1]);
    const order2 = new Order('o2', 'c2', [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });
});
