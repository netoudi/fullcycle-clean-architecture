import { ProductFindUseCase } from '@app/usecase/product/find/product.find.usecase';
import { Product } from '@app/domain/product/entity/product';

const product = new Product('123', 'My product', 10);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe('unit test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const usecase = new ProductFindUseCase(productRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'My product',
      price: 10,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not find a product', async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });
    const usecase = new ProductFindUseCase(productRepository);

    const input = {
      id: '123',
    };

    expect.assertions(1);

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('Product not found');
    }
  });
});
