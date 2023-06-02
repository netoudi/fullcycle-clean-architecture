import { Product } from '@app/domain/product/entity/product';
import { type ProductRepositoryInterface } from '@app/domain/product/repository/product-repository.interface';
import { ProductModel } from '@app/infrastructure/product/repository/sequelize/product.model';

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });

    if (productModel === null) {
      throw new Error('Product not found');
    }

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();

    return productModels.map((productModel) => {
      return new Product(productModel.id, productModel.name, productModel.price);
    });
  }
}
