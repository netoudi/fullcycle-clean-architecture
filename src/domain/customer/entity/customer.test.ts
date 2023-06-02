/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from '@app/domain/customer/entity/customer';
import { Address } from '@app/domain/customer/value-object/address';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'John Doe');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('1234', '');
    }).toThrowError('Name is required');
  });

  it('should change name', () => {
    // Arrange
    const customer = new Customer('1234', 'John Doe');

    // Act
    customer.changeName('Jane Doe');

    // Assert
    expect(customer.name).toBe('Jane Doe');
  });

  it('should activate customer', () => {
    const customer = new Customer('1234', 'John Doe');
    const address = new Address('Street 1', '123', '12345-678', 'São Paulo');
    customer.address = address;

    customer.activate();
    expect(customer.isActive()).toBeTruthy();

    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1234', 'John Doe');
    const address = new Address('Street 1', '123', '12345-678', 'São Paulo');
    customer.address = address;

    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();

    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1234', 'John Doe');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('1234', 'John Doe');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
