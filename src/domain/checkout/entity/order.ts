import { type OrderItem } from '@app/domain/checkout/entity/order_item';

export class Order {
  private readonly _id: string;
  private readonly _customerId: string;
  private readonly _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  validate(): void {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._customerId.length === 0) {
      throw new Error('CustomerId is required');
    }
    if (this._items.length === 0) {
      throw new Error('Items are required');
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error('Quantity must be greater than zero');
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }
}
