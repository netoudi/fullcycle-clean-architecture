import { randomUUID } from 'node:crypto';
import { Product } from '@app/domain/product/entity/product';
import { ProductB } from '@app/domain/product/entity/product-b';
import { type ProductInterface } from '@app/domain/product/entity/product.interface';

export class ProductFactory {
  public static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case 'a':
        return new Product(randomUUID(), name, price);
      case 'b':
        return new ProductB(randomUUID(), name, price);
      default:
        throw new Error('Product type not supported');
    }
  }
}
