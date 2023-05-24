import { type Product } from '@app/domain/entity/product';
import { type RepositoryInterface } from '@app/domain/repository/repository-interface';

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
