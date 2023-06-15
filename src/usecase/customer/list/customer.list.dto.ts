interface Customer {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zipcode: string;
    city: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomerListInputDto {
  //
}

export interface CustomerListOutputDto {
  customers: Customer[];
}
