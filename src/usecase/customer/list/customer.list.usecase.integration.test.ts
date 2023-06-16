import { CustomerListUseCase } from '@app/usecase/customer/list/customer.list.usecase';
import { Sequelize } from 'sequelize-typescript';
import { CustomerFactory } from '@app/domain/customer/factory/customer.factory';
import { Address } from '@app/domain/customer/value-object/address';
import { CustomerModel } from '@app/infrastructure/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@app/infrastructure/customer/repository/sequelize/customer.repository';

describe('integration test for listing customer use case', () => {
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

  it('should list customers', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new CustomerListUseCase(customerRepository);

    const customer1 = CustomerFactory.createWithAddress('John Doe', new Address('Street 1', '1', 'Zipcode', 'City'));
    await customerRepository.create(customer1);

    const customer2 = CustomerFactory.createWithAddress('Jane Doe', new Address('Street 2', '2', 'Zipcode', 'City'));
    await customerRepository.create(customer2);

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
