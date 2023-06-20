import { ProductCreateUseCase } from '@app/usecase/product/create/product.create.usecase';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('unit test create product use case', () => {
  let input = {
    name: 'My product',
    price: 10,
  };

  beforeEach(() => {
    input = {
      name: 'My product',
      price: 10,
    };
  });

  it('should create a product', async () => {
    const productRepository = MockRepository();
    const usecase = new ProductCreateUseCase(productRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: 'My product',
      price: 10,
    });
  });

  it('should thrown an error when name is missing', async () => {
    expect.assertions(1);

    const productRepository = MockRepository();
    const usecase = new ProductCreateUseCase(productRepository);

    input.name = '';

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('product: Name is required');
    }
  });

  it('should thrown an error when price is zero', async () => {
    expect.assertions(1);

    const productRepository = MockRepository();
    const usecase = new ProductCreateUseCase(productRepository);

    input.price = 0;

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('product: Price must be greater than zero');
    }
  });
});
