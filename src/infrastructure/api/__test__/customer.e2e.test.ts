import request from 'supertest';
import { app, sequelize } from '@app/infrastructure/api/express';

describe('e2e test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
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
});
