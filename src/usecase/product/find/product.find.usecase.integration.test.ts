import { ProductFindUseCase } from '@app/usecase/product/find/product.find.usecase';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '@app/domain/product/entity/product';
import { ProductModel } from '@app/infrastructure/product/repository/sequelize/product.model';
import { ProductRepository } from '@app/infrastructure/product/repository/sequelize/product.repository';

describe('integration test find product use case', () => {
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

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const usecase = new ProductFindUseCase(productRepository);

    const product = new Product('123', 'My product', 10);
    await productRepository.create(product);

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
});
