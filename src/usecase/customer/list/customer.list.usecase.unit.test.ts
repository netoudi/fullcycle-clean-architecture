import { CustomerListUseCase } from '@app/usecase/customer/list/customer.list.usecase';
import { CustomerFactory } from '@app/domain/customer/factory/customer.factory';
import { Address } from '@app/domain/customer/value-object/address';

const customer1 = CustomerFactory.createWithAddress('John Doe', new Address('Street 1', '1', 'Zipcode', 'City'));
const customer2 = CustomerFactory.createWithAddress('Jane Doe', new Address('Street 2', '2', 'Zipcode', 'City'));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
};

describe('unit test for listing customer use case', () => {
  it('should list customers', async () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerListUseCase(customerRepository);

    const result = await usecase.execute({});

    expect(result.customers).toHaveLength(2);

    // expect customer 1
    expect(result.customers[0].id).toBe(customer1.id);
    expect(result.customers[0].name).toBe(customer1.name);
    expect(result.customers[0].address.street).toBe(customer1.address.street);
    expect(result.customers[0].address.number).toBe(customer1.address.number);
    expect(result.customers[0].address.zipcode).toBe(customer1.address.zipcode);
    expect(result.customers[0].address.city).toBe(customer1.address.city);

    // expect customer 2
    expect(result.customers[1].id).toBe(customer2.id);
    expect(result.customers[1].name).toBe(customer2.name);
    expect(result.customers[1].address.street).toBe(customer2.address.street);
    expect(result.customers[1].address.number).toBe(customer2.address.number);
    expect(result.customers[1].address.zipcode).toBe(customer2.address.zipcode);
    expect(result.customers[1].address.city).toBe(customer2.address.city);
  });
});
