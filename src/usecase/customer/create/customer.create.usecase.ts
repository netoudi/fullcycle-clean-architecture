import {
  type CustomerCreateInputDto,
  type CustomerCreateOutputDto,
} from '@app/usecase/customer/create/customer.create.dto';
import { type CustomerRepositoryInterface } from '@app/domain/customer/repository/customer-repository.interface';

export class CustomerCreateUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: CustomerCreateInputDto): Promise<CustomerCreateOutputDto> {
    return {
      //
    };
  }
}
