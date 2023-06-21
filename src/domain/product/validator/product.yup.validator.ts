import * as yup from 'yup';
import { type ValidatorInterface } from '@app/domain/@shared/validator/validator.interface';
import { type ProductInterface } from '@app/domain/product/entity/product.interface';

export class ProductYupValidator implements ValidatorInterface<ProductInterface> {
  validate(entity: ProductInterface): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup.number().required('Price is required').moreThan(0, 'Price must be greater than zero'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          },
        );
    } catch (errors) {
      (errors as yup.ValidationError).errors.forEach((error) => {
        entity.notification.addError({
          context: entity.constructor.name.toLowerCase(),
          message: error,
        });
      });
    }
  }
}
