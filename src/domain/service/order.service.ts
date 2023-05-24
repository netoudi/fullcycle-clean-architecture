/* eslint-disable @typescript-eslint/no-extraneous-class */
import { randomUUID } from 'node:crypto';
import { type Customer } from '@app/entity/customer';
import { type OrderItem } from '@app/entity/order_item';
import { Order } from '../entity/order';

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    const order = new Order(randomUUID(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
