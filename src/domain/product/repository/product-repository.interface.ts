import { type RepositoryInterface } from '@app/domain/@shared/repository/repository-interface';
import { type Product } from '@app/domain/product/entity/product';

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
