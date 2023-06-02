import { Sequelize } from 'sequelize-typescript';
import { Customer } from '@app/domain/customer/entity/customer';
import { Address } from '@app/domain/customer/value-object/address';
import { CustomerModel } from '@app/infrastructure/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@app/infrastructure/customer/repository/sequelize/customer.repository';

describe('CustomerRepository', () => {
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

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));

    await customerRepository.create(customer);

    customer.changeName('Customer 2');
    customer.changeAddress(new Address('Street 2', '2', 'Zipcode', 'City'));
    customer.deactivate();

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));

    await customerRepository.create(customer);

    const customerResult = await customerRepository.find('1');

    expect(customerResult).toStrictEqual(customer);
  });

  it('should throw error when customer not found', async () => {
    expect.assertions(1);

    try {
      const customerRepository = new CustomerRepository();
      await customerRepository.find('1');
    } catch (error) {
      expect((error as Error).message).toBe('Customer not found');
    }
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer('1', 'Customer 1');
    customer1.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));
    customer1.addRewardPoints(10);
    customer1.activate();
    await customerRepository.create(customer1);

    const customer2 = new Customer('2', 'Customer 2');
    customer2.changeAddress(new Address('Street 2', '2', 'Zipcode', 'City'));
    customer2.addRewardPoints(20);
    customer2.deactivate();
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(foundCustomers).toHaveLength(2);
    expect(foundCustomers).toStrictEqual(customers);
  });
});
