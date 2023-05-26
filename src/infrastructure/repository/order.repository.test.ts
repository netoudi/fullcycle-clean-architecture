import { Sequelize } from 'sequelize-typescript';
import { Address } from '@app/domain/entity/address';
import { Customer } from '@app/domain/entity/customer';
import { Order } from '@app/domain/entity/order';
import { OrderItem } from '@app/domain/entity/order_item';
import { Product } from '@app/domain/entity/product';
import { CustomerModel } from '@app/infrastructure/db/sequelize/model/customer.model';
import { OrderItemModel } from '@app/infrastructure/db/sequelize/model/order-item.model';
import { OrderModel } from '@app/infrastructure/db/sequelize/model/order.model';
import { ProductModel } from '@app/infrastructure/db/sequelize/model/product.model';
import { CustomerRepository } from '@app/infrastructure/repository/customer.repository';
import { OrderRepository } from '@app/infrastructure/repository/order.repository';
import { ProductRepository } from '@app/infrastructure/repository/product.repository';

describe('OrderRepository', () => {
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
    // Customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer('111', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));
    await customerRepository.create(customer);

    // Product
    const productRepository = new ProductRepository();
    const product = new Product('222', 'Product 1', 100);
    await productRepository.create(product);

    // Order Item
    const orderItem = new OrderItem('333', product.name, product.id, product.price, 2);

    // Order
    const order = new Order('444', customer.id, [orderItem]);

    // Order Repository
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Expect
    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      items: [
        {
          id: orderItem.id,
          orderId: order.id,
          productId: product.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
      ],
      total: order.total(),
    });
  });
});
