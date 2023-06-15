import { type CustomerFindInputDto, type CustomerFindOutputDto } from '@app/usecase/customer/find/customer.find.dto';
import { type CustomerRepositoryInterface } from '@app/domain/customer/repository/customer-repository.interface';

export class CustomerFindUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: CustomerFindInputDto): Promise<CustomerFindOutputDto> {
    const customer = await this.customerRepository.find(input.id);

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
