import * as yup from 'yup';
import { type ValidatorInterface } from '@app/domain/@shared/validator/validator.interface';
import { type Address } from '@app/domain/customer/value-object/address';

export class AddressYupValidator implements ValidatorInterface<Address> {
  validate(entity: Address): void {
    try {
      yup
        .object()
        .shape({
          street: yup.string().required('Street is required'),
          number: yup.string().required('Number is required'),
          zipcode: yup.string().required('Zipcode is required'),
          city: yup.string().required('City is required'),
        })
        .validateSync(
          {
            street: entity.street,
            number: entity.number,
            zipcode: entity.zipcode,
            city: entity.city,
          },
          {
            abortEarly: false,
          },
        );
    } catch (errors) {
      (errors as yup.ValidationError).errors.forEach((error) => {
        entity.notification.addError({
          context: 'address',
          message: error,
        });
      });
    }
  }
}
