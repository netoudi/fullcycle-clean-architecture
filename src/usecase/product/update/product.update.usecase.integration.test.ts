import { ProductUpdateUseCase } from '@app/usecase/product/update/product.update.usecase';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '@app/domain/product/entity/product';
import { ProductModel } from '@app/infrastructure/product/repository/sequelize/product.model';
import { ProductRepository } from '@app/infrastructure/product/repository/sequelize/product.repository';

describe('integration test for product update use case', () => {
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
  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const usecase = new ProductUpdateUseCase(productRepository);

    const product = new Product('1', 'My product', 10);
    await productRepository.create(product);

    const input = {
      id: product.id,
      name: 'My product Update',
      price: 20,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
