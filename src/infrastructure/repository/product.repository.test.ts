import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '@app/infrastructure/db/sequelize/model/product.model';

describe('ProductRepository', () => {
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

  it('should create a new product', () => {
    expect(true).toBeTruthy();
  });
});
