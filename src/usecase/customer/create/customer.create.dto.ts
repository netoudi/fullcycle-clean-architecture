export interface CustomerCreateInputDto {
  name: string;
  address: {
    street: string;
    number: string;
    zipcode: string;
    city: string;
  };
}

export interface CustomerCreateOutputDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zipcode: string;
    city: string;
  };
}
