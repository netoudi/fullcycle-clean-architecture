import { CustomerFactory } from '@app/domain/customer/factory/customer.factory';
import { Address } from '@app/domain/customer/value-object/address';

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Doe');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Street', '123', '12345-678', 'New York');
    const customer = CustomerFactory.createWithAddress('John Doe', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address.street).toBe('Street');
    expect(customer.address.number).toBe('123');
    expect(customer.address.zipcode).toBe('12345-678');
    expect(customer.address.city).toBe('New York');
  });
});
