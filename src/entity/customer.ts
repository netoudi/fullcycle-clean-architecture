export class Customer {
  private readonly _id: string;
  private _name: string;
  private readonly _address: string;
  private _active: boolean = true;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
    this.validate();
  }

  validate(): void {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  activate(): void {
    if (this._address.length === 0) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  toString(): string {
    return this._name;
  }
}
