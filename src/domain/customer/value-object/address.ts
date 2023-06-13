export class Address {
  private readonly _street: string;
  private readonly _number: string;
  private readonly _zipcode: string;
  private readonly _city: string;

  constructor(street: string, number: string, zipcode: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zipcode;
    this._city = city;
    this.validate();
  }

  validate(): void {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }
    if (this._number.length === 0) {
      throw new Error('Number is required');
    }
    if (this._zipcode.length === 0) {
      throw new Error('Zipcode is required');
    }
    if (this._city.length === 0) {
      throw new Error('City is required');
    }
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get city(): string {
    return this._city;
  }
}
