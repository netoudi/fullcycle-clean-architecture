export class Customer {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  toString(): string {
    return this._name;
  }
}
