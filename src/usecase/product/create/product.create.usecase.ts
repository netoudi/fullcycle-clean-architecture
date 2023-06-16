import { randomUUID } from 'node:crypto';
import {
  type ProductCreateInputDto,
  type ProductCreateOutputDto,
} from '@app/usecase/product/create/product.create.dto';
import { Product } from '@app/domain/product/entity/product';
import { type ProductRepositoryInterface } from '@app/domain/product/repository/product-repository.interface';

export class ProductCreateUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: ProductCreateInputDto): Promise<ProductCreateOutputDto> {
    const product = new Product(randomUUID(), input.name, input.price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
