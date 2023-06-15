import { CustomerCreateUseCase } from '@app/usecase/customer/create/customer.create.usecase';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('unit test create customer use case', () => {
  let input = {
    name: 'John Doe',
    address: {
      street: 'Street 1',
      number: '1',
      zipcode: 'Zipcode',
      city: 'City',
    },
  };

  beforeEach(() => {
    input = {
      name: 'John Doe',
      address: {
        street: 'Street 1',
        number: '1',
        zipcode: 'Zipcode',
        city: 'City',
      },
    };
  });

  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

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

  it('should thrown an error when name is missing', async () => {
    expect.assertions(1);

    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    input.name = '';

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('Name is required');
    }
  });

  it('should thrown an error when street is missing', async () => {
    expect.assertions(1);

    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    input.address.street = '';

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('Street is required');
    }
  });

  it('should thrown an error when number is missing', async () => {
    expect.assertions(1);

    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    input.address.number = '';

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('Number is required');
    }
  });

  it('should thrown an error when zipcode is missing', async () => {
    expect.assertions(1);

    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    input.address.zipcode = '';

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('Zipcode is required');
    }
  });

  it('should thrown an error when city is missing', async () => {
    expect.assertions(1);

    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    input.address.city = '';

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('City is required');
    }
  });
});
