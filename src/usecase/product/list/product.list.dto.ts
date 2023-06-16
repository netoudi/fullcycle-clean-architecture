interface Product {
  id: string;
  name: string;
  price: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductListInputDto {
  //
}

export interface ProductListOutputDto {
  products: Product[];
}
