import { type ProductListInputDto, type ProductListOutputDto } from '@app/usecase/product/list/product.list.dto';
import { type ProductRepositoryInterface } from '@app/domain/product/repository/product-repository.interface';

export class ProductListUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: ProductListInputDto): Promise<ProductListOutputDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      }),
    };
  }
}
