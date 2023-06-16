import express, { type Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { customersRoute } from '@app/infrastructure/api/routes/customers.route';
import { CustomerModel } from '@app/infrastructure/customer/repository/sequelize/customer.model';

export const app: Express = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Hello world!');
});

app.use('/customers', customersRoute);

export let sequelize: Sequelize;

async function setupDb(): Promise<void> {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    sync: { force: true },
  });
  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setupDb().catch((error: any) => {
  console.error('[DB ERROR]', error);
});
