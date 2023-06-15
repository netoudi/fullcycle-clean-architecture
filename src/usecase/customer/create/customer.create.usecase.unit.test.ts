import { CustomerCreateUseCase } from '@app/usecase/customer/create/customer.create.usecase';
import { CustomerFindUseCase } from '@app/usecase/customer/find/customer.find.usecase';
import { Customer } from '@app/domain/customer/entity/customer';
import { Address } from '@app/domain/customer/value-object/address';

const customer = new Customer('123', 'John Doe');
customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe('unit test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    const input = {
      name: 'John Doe',
      address: {
        street: 'Street 1',
        number: '1',
        zipcode: 'Zipcode',
        city: 'City',
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      address: {
        street: 'Street 1',
        number: '1',
        zipcode: 'Zipcode',
        city: 'City',
      },
    });
  });
});
