export interface CustomerFindInputDto {
  id: string;
}

export interface CustomerFindOutputDto {
  id: string;
  name: string;
  address: {
    string: string;
    number: string;
    zipcode: string;
    city: string;
  };
}
