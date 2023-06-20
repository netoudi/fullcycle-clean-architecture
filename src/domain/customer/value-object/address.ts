import { Notification } from '@app/domain/@shared/notification/notification';
import { NotificationError } from '@app/domain/@shared/notification/notification.error';

export class Address {
  private readonly _street: string;
  private readonly _number: string;
  private readonly _zipcode: string;
  private readonly _city: string;
  private readonly _notifications: Notification;

  constructor(street: string, number: string, zipcode: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zipcode;
    this._city = city;
    this._notifications = new Notification();
    this.validate();
  }

  validate(): void {
    if (this._street.length === 0) {
      this._notifications.addError({
        context: 'address',
        message: 'Street is required',
      });
    }
    if (this._number.length === 0) {
      this._notifications.addError({
        context: 'address',
        message: 'Number is required',
      });
    }
    if (this._zipcode.length === 0) {
      this._notifications.addError({
        context: 'address',
        message: 'Zipcode is required',
      });
    }
    if (this._city.length === 0) {
      this._notifications.addError({
        context: 'address',
        message: 'City is required',
      });
    }

    if (this._notifications.hasErrors()) {
      throw new NotificationError(this._notifications.getErrors());
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
}
