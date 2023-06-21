import { Notification } from '@app/domain/@shared/notification/notification';
import { NotificationError } from '@app/domain/@shared/notification/notification.error';
import { AddressValidatorFactory } from '@app/domain/customer/factory/address.validator.factory';

export class Address {
  private readonly _street: string;
  private readonly _number: string;
  private readonly _zipcode: string;
  private readonly _city: string;
  private readonly _notification: Notification;

  constructor(street: string, number: string, zipcode: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zipcode;
    this._city = city;
    this._notification = new Notification();
    this.validate();
  }

  validate(): void {
    AddressValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get city(): string {
    return this._city;
  }

  get notification(): Notification {
    return this._notification;
  }
}
