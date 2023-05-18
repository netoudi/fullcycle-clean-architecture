import { Customer } from '@app/entity/customer';

const message: string = 'Hello World';

console.log(message);

const customer = new Customer('1234', 'John Doe', 'address...');

console.log(customer.toString());
