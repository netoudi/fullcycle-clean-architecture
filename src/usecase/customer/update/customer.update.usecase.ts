import {
  type CustomerUpdateInputDto,
  type CustomerUpdateOutputDto,
} from '@app/usecase/customer/update/customer.update.dto';
import { type CustomerRepositoryInterface } from '@app/domain/customer/repository/customer-repository.interface';
import { Address } from '@app/domain/customer/value-object/address';

export class CustomerUpdateUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: CustomerUpdateInputDto): Promise<CustomerUpdateOutputDto> {
    const customer = await this.customerRepository.find(input.id);

    const address = new Address(input.address.street, input.address.number, input.address.zipcode, input.address.city);
    customer.changeName(input.name);
    customer.changeAddress(address);
    await this.customerRepository.update(customer);

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
