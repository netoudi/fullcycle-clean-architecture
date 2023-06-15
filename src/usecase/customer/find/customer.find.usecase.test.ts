import { CustomerFindUseCase } from '@app/usecase/customer/find/customer.find.usecase';
import { waitForDebugger } from 'inspector';
import { Sequelize } from 'sequelize-typescript';
import { Customer } from '@app/domain/customer/entity/customer';
import { Address } from '@app/domain/customer/value-object/address';
import { CustomerModel } from '@app/infrastructure/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@app/infrastructure/customer/repository/sequelize/customer.repository';

describe('test find customer use case', () => {
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

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new CustomerFindUseCase(customerRepository);

    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));
    await customerRepository.create(customer);

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
});
