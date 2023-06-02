export class OrderItem {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _productId: string;
  private readonly _price: number;
  private readonly _quantity: number;

  constructor(id: string, name: string, productId: string, price: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._productId = productId;
    this._price = price;
    this._quantity = quantity;
  }

  total(): number {
    return this._price * this._quantity;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }
}
