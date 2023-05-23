/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from './product';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 100);
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('1234', '', 100);
    }).toThrowError('Name is required');
  });

  it('should throw error when price less then zero or equals zero', () => {
    expect(() => {
      const product = new Product('1234', 'Product 1', -1);
    }).toThrowError('Price must be greater than zero');

    expect(() => {
      const product = new Product('1234', 'Product 1', 0);
    }).toThrowError('Price must be greater than zero');
  });

  it('should change name', () => {
    const product = new Product('1234', 'Product 1', 100);

    product.changeName('Product 2');

    expect(product.name).toBe('Product 2');
  });

  it('should change price', () => {
    const product = new Product('1234', 'Product 1', 100);

    product.changePrice(200);

    expect(product.price).toBe(200);
  });
});
