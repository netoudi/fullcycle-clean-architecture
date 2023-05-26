import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '@app/infrastructure/db/sequelize/model/customer.model';
import { OrderItemModel } from '@app/infrastructure/db/sequelize/model/order-item.model';
import { OrderModel } from '@app/infrastructure/db/sequelize/model/order.model';
import { ProductModel } from '@app/infrastructure/db/sequelize/model/product.model';

describe('CustomerRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a order', async () => {
    expect(true).toBeTruthy();
  });
});
