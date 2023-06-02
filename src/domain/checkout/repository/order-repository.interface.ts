import { type RepositoryInterface } from '@app/domain/@shared/repository/repository-interface';
import { type Order } from '@app/domain/checkout/entity/order';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
