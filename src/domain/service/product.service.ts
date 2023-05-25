/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type Product } from '@app/domain/entity/product';

export class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
  }
}
