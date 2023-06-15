export interface CustomerUpdateInputDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zipcode: string;
    city: string;
  };
}

export interface CustomerUpdateOutputDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zipcode: string;
    city: string;
  };
}
