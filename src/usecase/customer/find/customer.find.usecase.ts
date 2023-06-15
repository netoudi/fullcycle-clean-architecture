import { type CustomerFindInputDto, type CustomerFindOutputDto } from '@app/usecase/customer/find/customer.find.dto';

export class CustomerFindUseCase {
  async execute(input: CustomerFindInputDto): Promise<CustomerFindOutputDto> {
    return {};
  }
}
