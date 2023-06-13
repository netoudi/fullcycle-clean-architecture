import { Order } from '@app/domain/checkout/entity/order';
import { OrderItem } from '@app/domain/checkout/entity/order_item';
import { Customer } from '@app/domain/customer/entity/customer';
import { Address } from '@app/domain/customer/value-object/address';

const message: string = 'Hello World';

console.log(message);

const customer = new Customer('1234', 'John Doe');
const address = new Address('Rua dois', '2', '12345-678', 'São Paulo');
customer.address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 'p1', 10, 1);
const item2 = new OrderItem('2', 'Item 2', 'p2', 10, 1);

const order = new Order('1', '1234', [item1, item2]);

console.log(order.id);

console.log(customer.name);

customer.changeName('Jane Joe');

console.log(customer.name);

// Complexidade de negócio
// - Domain (coração da applicação)
// -- Entity
// --- customer.ts --> contém a regra de negócio
//
// Complexidade acidental
// - Infra (mundo externo)
// -- Entity/Model
// --- customer.ts (get, set) --> mapeado para db, json, text...
