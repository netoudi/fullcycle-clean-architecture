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

describe('unit test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerFindUseCase(customerRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Street 1',
        number: '1',
        zipcode: 'Zipcode',
        city: 'City',
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not find a customer', async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });
    const usecase = new CustomerFindUseCase(customerRepository);

    const input = {
      id: '123',
    };

    expect.assertions(1);

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('Customer not found');
    }
  });
});
