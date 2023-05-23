/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from './order';
import { OrderItem } from './order_item';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', '1234', []);
    }).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('1234', '', []);
    }).toThrowError('CustomerId is required');
  });

  it('should throw error when items is empty', () => {
    expect(() => {
      const order = new Order('1234', '1234', []);
    }).toThrowError('Items are required');
  });

  it('should calculate total', () => {
    const item1 = new OrderItem('i1', 'item 1', 100);
    const item2 = new OrderItem('i2', 'item 2', 200);

    const order1 = new Order('1234', '1234', [item1]);
    expect(order1.total()).toBe(100);

    const order2 = new Order('1234', '1234', [item1, item2]);
    expect(order2.total()).toBe(300);
  });
});
