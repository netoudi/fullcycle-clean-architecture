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
  it('should list customers', () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerListUseCase(customerRepository);

    const result = usecase.execute();

    expect(result.customers).toHaveLength(2);
  });
});
