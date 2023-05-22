import { Address } from '@app/entity/address';
import { Customer } from '@app/entity/customer';
import { Order } from '@app/entity/order';
import { OrderItem } from '@app/entity/order_item';

const message: string = 'Hello World';

console.log(message);

const customer = new Customer('1234', 'John Doe');
const address = new Address('Rua dois', '2', '12345-678', 'São Paulo');
customer.address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10);
const item2 = new OrderItem('2', 'Item 2', 10);

const order = new Order('1', '1234', [item1, item2]);

console.log(order.id);

console.log(customer.toString());

customer.changeName('Jane Joe');

console.log(customer.toString());

// Complexidade de negócio
// - Domain (coração da applicação)
// -- Entity
// --- customer.ts --> contém a regra de negócio
//
// Complexidade acidental
// - Infra (mundo externo)
// -- Entity/Model
// --- customer.ts (get, set) --> mapeado para db, json, text...
