import { ProductListUseCase } from '@app/usecase/product/list/product.list.usecase';
import { Product } from '@app/domain/product/entity/product';

const product1 = new Product('111', 'My product', 10);
const product2 = new Product('222', 'My product', 20);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe('unit test for listing product use case', () => {
  it('should list products', async () => {
    const productRepository = MockRepository();
    const usecase = new ProductListUseCase(productRepository);

    const result = await usecase.execute({});

    expect(result.products).toHaveLength(2);

    // expect product 1
    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].price).toBe(product1.price);

    // expect product 2
    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].price).toBe(product2.price);
  });
});
