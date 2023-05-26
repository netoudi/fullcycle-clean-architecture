import { type Order } from '@app/domain/entity/order';
import { type RepositoryInterface } from '@app/domain/repository/repository-interface';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
