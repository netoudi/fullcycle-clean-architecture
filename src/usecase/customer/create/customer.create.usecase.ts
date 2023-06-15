import {
  type CustomerCreateInputDto,
  type CustomerCreateOutputDto,
} from '@app/usecase/customer/create/customer.create.dto';
import { CustomerFactory } from '@app/domain/customer/factory/customer.factory';
import { type CustomerRepositoryInterface } from '@app/domain/customer/repository/customer-repository.interface';
import { Address } from '@app/domain/customer/value-object/address';

export class CustomerCreateUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: CustomerCreateInputDto): Promise<CustomerCreateOutputDto> {
    const address = new Address(input.address.street, input.address.number, input.address.zipcode, input.address.city);
    const customer = CustomerFactory.createWithAddress(input.name, address);

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zipcode: customer.address.zipcode,
        city: customer.address.city,
      },
    };
  }
}
