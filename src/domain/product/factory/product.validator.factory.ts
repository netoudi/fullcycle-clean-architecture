import { type ValidatorInterface } from '@app/domain/@shared/validator/validator.interface';
import { type ProductInterface } from '@app/domain/product/entity/product.interface';
import { ProductYupValidator } from '@app/domain/product/validator/product.yup.validator';

export class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductYupValidator();
  }
}
