import { CustomerCreateUseCase } from '@app/usecase/customer/create/customer.create.usecase';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '@app/infrastructure/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@app/infrastructure/customer/repository/sequelize/customer.repository';

describe('integration test create customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

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
    const customerRepository = new CustomerRepository();
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

    const customerRepository = new CustomerRepository();
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

    const customerRepository = new CustomerRepository();
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

    const customerRepository = new CustomerRepository();
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

    const customerRepository = new CustomerRepository();
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

    const customerRepository = new CustomerRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    input.address.city = '';

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('City is required');
    }
  });
});
