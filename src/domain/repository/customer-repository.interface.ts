import { type Customer } from '@app/domain/entity/customer';
import { type RepositoryInterface } from '@app/domain/repository/repository-interface';

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
