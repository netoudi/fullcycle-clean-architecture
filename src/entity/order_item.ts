export class OrderItem {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
  }
}
