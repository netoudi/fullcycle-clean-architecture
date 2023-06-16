import { type ProductFindInputDto, type ProductFindOutputDto } from '@app/usecase/product/find/product.find.dto';
import { type ProductRepositoryInterface } from '@app/domain/product/repository/product-repository.interface';

export class ProductFindUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: ProductFindInputDto): Promise<ProductFindOutputDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
