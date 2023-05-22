import { type OrderItem } from '@app/entity/order_item';

export class Order {
  private readonly _id: string;
  private readonly _customerId: string;
  private readonly _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[] = []) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
  }

  get id(): string {
    return this._id;
  }
}
