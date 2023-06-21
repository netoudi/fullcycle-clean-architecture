import { type ValidatorInterface } from '@app/domain/@shared/validator/validator.interface';
import { type Customer } from '@app/domain/customer/entity/customer';
import { CustomerYupValidator } from '@app/domain/customer/validator/customer.yup.validator';

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
