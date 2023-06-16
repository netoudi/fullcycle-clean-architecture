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
    const response = await request(app)
      .post('/customers')
      .send({
        name: 'John Doe',
        address: {
          street: 'Street',
          number: '1234',
          zipcode: 'Zipcode',
          city: 'City',
        },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.address.street).toBe('Street');
    expect(response.body.address.number).toBe('1234');
    expect(response.body.address.zipcode).toBe('Zipcode');
    expect(response.body.address.city).toBe('City');
  });

  it('should not create a customer', async () => {
    const response = await request(app).post('/customers').send({
      name: 'John Doe',
    });

    expect(response.statusCode).toBe(500);
  });

  it('should list all customers', async () => {
    // customer John Doe
    const response1 = await request(app)
      .post('/customers')
      .send({
        name: 'John Doe',
        address: {
          street: 'Street 1',
          number: '1234',
          zipcode: 'Zipcode 1',
          city: 'City 1',
        },
      });

    expect(response1.statusCode).toBe(200);

    // customer Jane Doe
    const response2 = await request(app)
      .post('/customers')
      .send({
        name: 'Jane Doe',
        address: {
          street: 'Street 2',
          number: '4321',
          zipcode: 'Zipcode 2',
          city: 'City 2',
        },
      });

    expect(response2.statusCode).toBe(200);

    // all customers
    const listResponse = await request(app).get('/customers');

    expect(listResponse.statusCode).toBe(200);
    expect(listResponse.body.customers).toHaveLength(2);

    // customer 1
    const customer1 = listResponse.body.customers[0];
    expect(customer1.name).toBe('John Doe');
    expect(customer1.address.street).toBe('Street 1');

    // customer 2
    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe('Jane Doe');
    expect(customer2.address.street).toBe('Street 2');
  });
});
