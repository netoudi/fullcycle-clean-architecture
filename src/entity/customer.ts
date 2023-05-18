export class Customer {
  private readonly _id: string;
  private _name: string;
  private readonly _address: string;
  private _active: boolean = true;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  changeName(name: string): void {
    this._name = name;
  }

  activate(): void {
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  toString(): string {
    return this._name;
  }
}
