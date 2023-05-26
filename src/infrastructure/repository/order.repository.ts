import { type Order } from '@app/domain/entity/order';
import { type OrderRepositoryInterface } from '@app/domain/repository/order-repository.interface';

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {}

  async update(entity: Order): Promise<void> {}

  async find(id: string): Promise<Order> {}

  async findAll(): Promise<Order[]> {}
}
