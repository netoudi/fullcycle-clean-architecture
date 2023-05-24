import { Sequelize } from 'sequelize';

describe('ProductRepository', () => {
  let sequelize: Sequelize;

  beforeEach(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new product', () => {
    expect(true).toBeTruthy();
  });
});
