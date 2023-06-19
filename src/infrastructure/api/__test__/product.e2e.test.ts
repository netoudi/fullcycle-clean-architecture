import request from 'supertest';
import { app, sequelize } from '@app/infrastructure/api/express';

describe('e2e test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app).post('/products').send({
      name: 'My product',
      price: 10,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('My product');
    expect(response.body.price).toBe(10);
  });

  it('should not create a customer', async () => {
    const response = await request(app).post('/products').send({
      name: 'My product',
    });

    expect(response.statusCode).toBe(500);
  });

  it('should list all products', async () => {
    // customer My product
    const response1 = await request(app).post('/products').send({
      name: 'My product 1',
      price: 10,
    });

    expect(response1.statusCode).toBe(200);

    // customer Jane Doe
    const response2 = await request(app).post('/products').send({
      name: 'My product 2',
      price: 20,
    });

    expect(response2.statusCode).toBe(200);

    // all products
    const listResponse = await request(app).get('/products');

    expect(listResponse.statusCode).toBe(200);
    expect(listResponse.body.products).toHaveLength(2);

    // customer 1
    const customer1 = listResponse.body.products[0];
    expect(customer1.name).toBe('My product 1');
    expect(customer1.price).toBe(10);

    // customer 2
    const customer2 = listResponse.body.products[1];
    expect(customer2.name).toBe('My product 2');
    expect(customer2.price).toBe(20);
  });
});
