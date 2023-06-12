import { Order } from '@app/domain/checkout/entity/order';
import { OrderItem } from '@app/domain/checkout/entity/order_item';

export interface OrderFactoryCreateProps {
  id: string;
  customerId: string;
  items: Array<{
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }>;
}

export class OrderFactory {
  public static create(props: OrderFactoryCreateProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(item.id, item.name, item.productId, item.price, item.quantity);
    });

    return new Order(props.id, props.customerId, items);
  }
}
