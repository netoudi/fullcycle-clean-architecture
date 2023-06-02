import { type RepositoryInterface } from '@app/domain/@shared/repository/repository-interface';
import { type Customer } from '@app/domain/customer/entity/customer';

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
