import { ProductListUseCase } from '@app/usecase/product/list/product.list.usecase';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '@app/domain/product/entity/product';
import { ProductModel } from '@app/infrastructure/product/repository/sequelize/product.model';
import { ProductRepository } from '@app/infrastructure/product/repository/sequelize/product.repository';

describe('integration test for listing product use case', () => {
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

  it('should list products', async () => {
    const productRepository = new ProductRepository();
    const usecase = new ProductListUseCase(productRepository);

    const product1 = new Product('111', 'My product', 10);
    await productRepository.create(product1);

    const product2 = new Product('222', 'My product', 20);
    await productRepository.create(product2);

    const result = await usecase.execute({});

    expect(result.products).toHaveLength(2);

    // expect product 1
    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].price).toBe(product1.price);

    // expect product 2
    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].price).toBe(product2.price);
  });
});
