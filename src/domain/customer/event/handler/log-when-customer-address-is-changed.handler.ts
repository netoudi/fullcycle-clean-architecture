import { type EventHandlerInterface } from '@app/domain/@shared/event/event-handler.interface';
import { type Customer } from '@app/domain/customer/entity/customer';
import { type CustomerAddressChangedEvent } from '@app/domain/customer/event/customer-address-changed.event';

export class LogWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, address }: Customer = event.eventData;

    console.log(
      `Customer address: ${id}, ${name} changed to: ${address.zipcode}, ${address.city}, ${address.street} ${address.number}`,
    );
  }
}
