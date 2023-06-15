import {
  type CustomerUpdateInputDto,
  type CustomerUpdateOutputDto,
} from '@app/usecase/customer/update/customer.update.dto';
import { type CustomerRepositoryInterface } from '@app/domain/customer/repository/customer-repository.interface';

export class CustomerUpdateUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: CustomerUpdateInputDto): Promise<CustomerUpdateOutputDto> {
    return {
      //
    };
  }
}
