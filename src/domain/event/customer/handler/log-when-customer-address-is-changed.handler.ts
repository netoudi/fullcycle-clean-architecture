import { type Customer } from '@app/domain/entity/customer';
import { type EventHandlerInterface } from '@app/domain/event/@shared/event-handler.interface';
import { type CustomerAddressChangedEvent } from '@app/domain/event/customer/customer-address-changed.event';

export class LogWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, address }: Customer = event.eventData;

    console.log(
      `Customer address: ${id}, ${name} changed to: ${address.zipcode}, ${address.city}, ${address.street} ${address.number}`,
    );
  }
}
