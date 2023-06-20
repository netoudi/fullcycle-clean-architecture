/* eslint-disable @typescript-eslint/no-unused-vars */
import { Address } from '@app/domain/customer/value-object/address';

describe('Address unit tests', () => {
  it('should throw error when id street empty', () => {
    expect(() => {
      const address = new Address('', '1234', '12345-567', 'New York');
    }).toThrowError('address: Street is required');
  });

  it('should throw error when number is empty', () => {
    expect(() => {
      const address = new Address('Street', '', '12345-567', 'New York');
    }).toThrowError('address: Number is required');
  });
  it('should throw error when zipcode is empty', () => {
    expect(() => {
      const address = new Address('Street', '1234', '', 'New York');
    }).toThrowError('address: Zipcode is required');
  });
  it('should throw error when city is empty', () => {
    expect(() => {
      const address = new Address('Street', '1234', '12345-567', '');
    }).toThrowError('address: City is required');
  });
});
