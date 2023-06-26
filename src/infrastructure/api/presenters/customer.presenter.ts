import { type CustomerListOutputDto } from '@app/usecase/customer/list/customer.list.dto';
import { toXML } from 'jstoxml';

export class CustomerPresenter {
  static toXml(data: CustomerListOutputDto): string {
    const xmlOption = {
      header: true,
      indent: ' ',
      newline: '\n',
      allowEmpty: true,
    };

    return toXML(
      {
        customers: data.customers.map((customer) => {
          return {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zipcode: customer.address.zipcode,
              city: customer.address.city,
            },
          };
        }),
      },
      xmlOption,
    );
  }
}
