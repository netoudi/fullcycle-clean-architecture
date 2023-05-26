import { type Order } from '@app/domain/entity/order';
import { type OrderRepositoryInterface } from '@app/domain/repository/order-repository.interface';
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

  async update(entity: Order): Promise<void> {}

  async find(id: string): Promise<Order> {}

  async findAll(): Promise<Order[]> {}
}
