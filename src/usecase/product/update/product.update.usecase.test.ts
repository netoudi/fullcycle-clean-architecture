import { ProductUpdateUseCase } from '@app/usecase/product/update/product.update.usecase';
import { Product } from '@app/domain/product/entity/product';

const product = new Product('1', 'My product', 10);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

const input = {
  id: product.id,
  name: 'My product',
  price: 10,
};

describe('unit test for product update use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();
    const usecase = new ProductUpdateUseCase(productRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
