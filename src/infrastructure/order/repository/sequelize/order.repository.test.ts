import { Sequelize } from 'sequelize-typescript';
import { Order } from '@app/domain/checkout/entity/order';
import { OrderItem } from '@app/domain/checkout/entity/order_item';
import { Customer } from '@app/domain/customer/entity/customer';
import { Address } from '@app/domain/customer/value-object/address';
import { Product } from '@app/domain/product/entity/product';
import { CustomerModel } from '@app/infrastructure/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '@app/infrastructure/customer/repository/sequelize/customer.repository';
import { OrderItemModel } from '@app/infrastructure/order/repository/sequelize/order-item.model';
import { OrderModel } from '@app/infrastructure/order/repository/sequelize/order.model';
import { OrderRepository } from '@app/infrastructure/order/repository/sequelize/order.repository';
import { ProductModel } from '@app/infrastructure/product/repository/sequelize/product.model';
import { ProductRepository } from '@app/infrastructure/product/repository/sequelize/product.repository';

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

  it('should update a order', async () => {
    // Customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer('111', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));
    await customerRepository.create(customer);

    // Product
    const productRepository = new ProductRepository();

    const product1 = new Product('100', 'Product 1', 100);
    await productRepository.create(product1);

    const product2 = new Product('200', 'Product 2', 200);
    await productRepository.create(product2);

    // Order Item
    const orderItem1 = new OrderItem('333', product1.name, product1.id, product1.price, 2);
    const orderItem2 = new OrderItem('444', product2.name, product2.id, product2.price, 3);

    // Order
    const order = new Order('555', customer.id, [orderItem1]);

    // Order create
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Order update
    const orderUpdate = new Order(order.id, customer.id, [orderItem1, orderItem2]);
    await orderRepository.update(orderUpdate);

    // Expect
    const orderModel = await OrderModel.findOne({ where: { id: orderUpdate.id }, include: ['items'] });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: orderUpdate.id,
      customerId: customer.id,
      items: [
        {
          id: orderItem1.id,
          orderId: orderUpdate.id,
          productId: product1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
        },
        {
          id: orderItem2.id,
          orderId: orderUpdate.id,
          productId: product2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
        },
      ],
      total: orderUpdate.total(),
    });
  });

  it('should throw an error when cannot update an order', async () => {
    // Customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer('111', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));
    await customerRepository.create(customer);

    // Product
    const productRepository = new ProductRepository();

    const product1 = new Product('100', 'Product 1', 100);
    await productRepository.create(product1);

    const product2 = new Product('200', 'Product 2', 200);
    await productRepository.create(product2);

    // Order Item
    const orderItem1 = new OrderItem('333', product1.name, product1.id, product1.price, 2);
    const orderItem2 = new OrderItem('444', product2.name, product2.id, product2.price, 3);

    // Order
    const order = new Order('555', customer.id, [orderItem1]);

    // Order create
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Order update
    try {
      const orderUpdate = new Order(order.id, '222', [orderItem1, orderItem2]);
      await orderRepository.update(orderUpdate);
    } catch (error) {
      expect((error as Error).message).toBe('Order cannot be updated');
    }

    // Expect
    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      items: [
        {
          id: orderItem1.id,
          orderId: order.id,
          productId: product1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
        },
      ],
      total: order.total(),
    });
  });

  it('should find a order', async () => {
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
    const orderFound = await orderRepository.find(order.id);

    expect(orderFound).toStrictEqual(order);
  });

  it('should throw an error when order is not found', async () => {
    expect.assertions(1);

    try {
      const orderRepository = new OrderRepository();
      await orderRepository.find('1');
    } catch (error) {
      expect((error as Error).message).toBe('Order not found');
    }
  });

  it('should find all order', async () => {
    // Customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer('111', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));
    await customerRepository.create(customer);

    // Product
    const productRepository = new ProductRepository();

    const product1 = new Product('100', 'Product 1', 100);
    await productRepository.create(product1);

    const product2 = new Product('200', 'Product 2', 200);
    await productRepository.create(product2);

    // Order Item
    const orderItem1 = new OrderItem('333', product1.name, product1.id, product1.price, 1);
    const orderItem2 = new OrderItem('444', product1.name, product1.id, product1.price, 2);
    const orderItem3 = new OrderItem('555', product2.name, product2.id, product2.price, 3);

    // Order
    const order1 = new Order('666', customer.id, [orderItem1]);
    const order2 = new Order('777', customer.id, [orderItem2, orderItem3]);

    // Order Repository
    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    // Expect
    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toHaveLength(2);
    expect(foundOrders).toContainEqual(order1);
    expect(foundOrders).toContainEqual(order2);
  });

  it('should throw an error when sequelize transaction is not available', async () => {
    jest.spyOn(sequelize, 'transaction');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    sequelize.transaction.mockImplementation(async () => {
      await Promise.resolve(undefined);
    });

    // Customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer('111', 'Customer 1');
    customer.changeAddress(new Address('Street 1', '1', 'Zipcode', 'City'));
    await customerRepository.create(customer);

    // Product
    const productRepository = new ProductRepository();

    const product1 = new Product('100', 'Product 1', 100);
    await productRepository.create(product1);

    const product2 = new Product('200', 'Product 2', 200);
    await productRepository.create(product2);

    // Order Item
    const orderItem1 = new OrderItem('333', product1.name, product1.id, product1.price, 2);
    const orderItem2 = new OrderItem('444', product2.name, product2.id, product2.price, 3);

    // Order
    const order = new Order('555', customer.id, [orderItem1]);

    // Order create
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // Order update
    expect.assertions(1);

    try {
      const orderUpdate = new Order(order.id, customer.id, [orderItem1, orderItem2]);
      await orderRepository.update(orderUpdate);
    } catch (error) {
      expect((error as Error).message).toBe('Sequelize transaction not available!');
    }
  });
});
