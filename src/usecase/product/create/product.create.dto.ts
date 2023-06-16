export interface ProductCreateInputDto {
  name: string;
  price: number;
}

export interface ProductCreateOutputDto {
  id: string;
  name: string;
  price: number;
}
