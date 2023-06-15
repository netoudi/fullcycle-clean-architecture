import { type CustomerListInputDto, type CustomerListOutputDto } from '@app/usecase/customer/list/customer.list.dto';
import { type CustomerRepositoryInterface } from '@app/domain/customer/repository/customer-repository.interface';

export class CustomerListUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: CustomerListInputDto): Promise<CustomerListOutputDto> {
    const customers = await this.customerRepository.findAll();

    return {
      customers: customers.map((customer) => {
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
      }),
    };
  }
}
