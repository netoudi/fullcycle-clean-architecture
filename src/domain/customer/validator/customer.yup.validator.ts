import * as yup from 'yup';
import { type ValidatorInterface } from '@app/domain/@shared/validator/validator.interface';
import { type Customer } from '@app/domain/customer/entity/customer';

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Id is required'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity,
          },
          {
            abortEarly: false,
          },
        );
    } catch (errors) {
      (errors as yup.ValidationError).errors.forEach((error) => {
        entity.notification.addError({
          context: 'customer',
          message: error,
        });
      });
    }
  }
}
