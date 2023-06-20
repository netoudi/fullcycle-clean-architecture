import { ProductCreateUseCase } from '@app/usecase/product/create/product.create.usecase';
import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '@app/infrastructure/product/repository/sequelize/product.model';
import { ProductRepository } from '@app/infrastructure/product/repository/sequelize/product.repository';

describe('integration test create product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

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
    const productRepository = new ProductRepository();
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

    const productRepository = new ProductRepository();
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

    const productRepository = new ProductRepository();
    const usecase = new ProductCreateUseCase(productRepository);

    input.price = 0;

    try {
      await usecase.execute(input);
    } catch (error) {
      expect((error as Error).message).toBe('product: Price must be greater than zero');
    }
  });
});
