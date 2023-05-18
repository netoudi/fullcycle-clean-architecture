import { Customer } from '@app/entity/customer';

const message: string = 'Hello World';

console.log(message);

const customer = new Customer('1234', 'John Doe', 'address...');

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
