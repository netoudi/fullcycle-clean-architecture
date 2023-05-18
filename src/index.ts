import { Customer } from '@app/entity/customer';

const message: string = 'Hello World';

console.log(message);

const customer = new Customer('John Doe');

console.log(customer.toString());
