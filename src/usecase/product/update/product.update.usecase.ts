import {
  type ProductUpdateInputDto,
  type ProductUpdateOutputDto,
} from '@app/usecase/product/update/product.update.dto';
import { type ProductRepositoryInterface } from '@app/domain/product/repository/product-repository.interface';

export class ProductUpdateUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: ProductUpdateInputDto): Promise<ProductUpdateOutputDto> {
    const product = await this.productRepository.find(input.id);

    product.changeName(input.name);
    product.changePrice(input.price);
    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
