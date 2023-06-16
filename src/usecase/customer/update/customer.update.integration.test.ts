import { CustomerUpdateUseCase } from '@app/usecase/customer/update/customer.update.usecase';
import { Sequelize } from 'sequelize-typescript';
import { CustomerFactory } from '@app/domain/customer/factory/customer.factory';
import { Address } from '@app/domain/customer/value-object/address';
import { CustomerModel } from '@app/infrastructure/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@app/infrastructure/customer/repository/sequelize/customer.repository';

describe('integration test for customer update use case', () => {
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

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new CustomerUpdateUseCase(customerRepository);

    const customer = CustomerFactory.createWithAddress('John Doe', new Address('Street 1', '1', 'Zipcode', 'City'));
    await customerRepository.create(customer);

    const input = {
      id: customer.id,
      name: 'John Doe Update',
      address: {
        street: 'Street 1 Update',
        number: '1 Update',
        zipcode: 'Zipcode Update',
        city: 'City Update',
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
