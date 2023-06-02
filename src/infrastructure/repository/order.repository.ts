import { Order } from '@app/domain/checkout/entity/order';
import { OrderItem } from '@app/domain/checkout/entity/order_item';
import { type OrderRepositoryInterface } from '@app/domain/checkout/repository/order-repository.interface';
import { OrderItemModel } from '@app/infrastructure/db/sequelize/model/order-item.model';
import { OrderModel } from '@app/infrastructure/db/sequelize/model/order.model';

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        items: entity.items.map((item) => {
          return {
            id: item.id,
            orderId: entity.id,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
        }),
        total: entity.total(),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    );
  }

  async update(entity: Order): Promise<void> {
    const t = await OrderModel.sequelize?.transaction();

    if (t === undefined) {
      throw new Error('Sequelize transaction not available!');
    }

    try {
      await OrderModel.update(
        {
          customerId: entity.customerId,
          total: entity.total(),
        },
        {
          where: {
            id: entity.id,
          },
          transaction: t,
        },
      );

      await OrderItemModel.destroy({ where: { order_id: entity.id }, transaction: t });

      await OrderItemModel.bulkCreate(
        entity.items.map((item) => {
          return {
            id: item.id,
            orderId: entity.id,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
        }),
        { transaction: t },
      );

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw new Error('Order cannot be updated');
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id }, include: ['items'] });

    if (orderModel === null) {
      throw new Error('Order not found');
    }

    return this.mapperOrder(orderModel);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] });

    return orderModels.map(this.mapperOrder);
  }

  private mapperOrder(orderModel: OrderModel): Order {
    const items = orderModel.items.map(
      (item) => new OrderItem(item.id, item.name, item.productId, item.price, item.quantity),
    );

    return new Order(orderModel.id, orderModel.customerId, items);
  }
}
