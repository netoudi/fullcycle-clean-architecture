export interface CustomerFindInputDto {
  id: string;
}

export interface CustomerFindOutputDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zipcode: string;
    city: string;
  };
}
