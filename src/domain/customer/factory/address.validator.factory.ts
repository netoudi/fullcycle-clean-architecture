import { type ValidatorInterface } from '@app/domain/@shared/validator/validator.interface';
import { AddressYupValidator } from '@app/domain/customer/validator/address.yup.validator';
import { type Address } from '@app/domain/customer/value-object/address';

export class AddressValidatorFactory {
  static create(): ValidatorInterface<Address> {
    return new AddressYupValidator();
  }
}
