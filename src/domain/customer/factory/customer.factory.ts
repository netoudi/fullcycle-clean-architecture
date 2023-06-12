import { randomUUID } from 'node:crypto';
import { Customer } from '@app/domain/customer/entity/customer';
import { type Address } from '@app/domain/customer/value-object/address';

export class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(randomUUID(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(randomUUID(), name);
    customer.changeAddress(address);

    return customer;
  }
}
