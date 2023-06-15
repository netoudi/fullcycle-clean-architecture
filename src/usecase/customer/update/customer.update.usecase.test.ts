import { CustomerUpdateUseCase } from '@app/usecase/customer/update/customer.update.usecase';
import { CustomerFactory } from '@app/domain/customer/factory/customer.factory';
import { Address } from '@app/domain/customer/value-object/address';

const customer = CustomerFactory.createWithAddress('John Doe', new Address('Street 1', '1', 'Zipcode', 'City'));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

const input = {
  id: customer.id,
  name: 'John Doe',
  address: {
    street: 'Street 1',
    number: '1',
    zipcode: 'Zipcode',
    city: 'City',
  },
};

describe('unit test for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerUpdateUseCase(customerRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
