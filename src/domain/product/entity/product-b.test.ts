/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductB } from '@app/domain/product/entity/product-b';

describe('ProductB unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new ProductB('', 'Product 1', 100);
    }).toThrowError('productb: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new ProductB('1234', '', 100);
    }).toThrowError('productb: Name is required');
  });

  it('should throw error when price less then zero or equals zero', () => {
    expect(() => {
      const product = new ProductB('1234', 'Product 1', -1);
    }).toThrowError('productb: Price must be greater than zero');

    expect(() => {
      const product = new ProductB('1234', 'Product 1', 0);
    }).toThrowError('productb: Price must be greater than zero');
  });

  it('should throw error when id and name are empty', () => {
    expect(() => {
      const customer = new ProductB('', '', 10);
    }).toThrowError('productb: Id is required,productb: Name is required');
  });

  it('should change name', () => {
    const product = new ProductB('1234', 'Product 1', 100);

    product.changeName('Product 2');

    expect(product.name).toBe('Product 2');
  });

  it('should change price', () => {
    const product = new ProductB('1234', 'Product 1', 100);

    product.changePrice(200);

    expect(product.price).toBe(400);
  });
});
