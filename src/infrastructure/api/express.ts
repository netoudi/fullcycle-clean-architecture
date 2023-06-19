import express, { type Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { customersRoute } from '@app/infrastructure/api/routes/customers.route';
import { productsRoute } from '@app/infrastructure/api/routes/products.route';
import { CustomerModel } from '@app/infrastructure/customer/repository/sequelize/customer.model';
import { ProductModel } from '@app/infrastructure/product/repository/sequelize/product.model';

export const app: Express = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Hello world!');
});

app.use('/customers', customersRoute);
app.use('/products', productsRoute);

export let sequelize: Sequelize;

async function setupDb(): Promise<void> {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    sync: { force: true },
  });
  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDb().catch((error: any) => {
  console.error('[DB ERROR]', error);
});
