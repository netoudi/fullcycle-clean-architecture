import { Address } from '@app/domain/entity/address';
import { Customer } from '@app/domain/entity/customer';
import { type CustomerRepositoryInterface } from '@app/domain/repository/customer-repository.interface';
import { CustomerModel } from '@app/infrastructure/db/sequelize/model/customer.model';

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipcode,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zipcode,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });

    if (customerModel === null) {
      throw new Error('Customer not found');
    }

    return this.mapperCustomer(customerModel);
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map(this.mapperCustomer);
  }

  private mapperCustomer(customerModel: CustomerModel): Customer {
    const customer = new Customer(customerModel.id, customerModel.name);

    customer.changeAddress(
      new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city),
    );

    customer.addRewardPoints(customerModel.rewardPoints);

    if (customerModel.active) {
      customer.activate();
    } else {
      customer.deactivate();
    }

    return customer;
  }
}
