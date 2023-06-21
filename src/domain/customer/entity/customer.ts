import { Entity } from '@app/domain/@shared/entity/entity.abstract';
import { NotificationError } from '@app/domain/@shared/notification/notification.error';
import { CustomerValidatorFactory } from '@app/domain/customer/factory/customer.validator.factory';
import { type Address } from '@app/domain/customer/value-object/address';

export class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super(id);
    this._name = name;
    this.validate();
  }

  validate(): void {
    CustomerValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address): void {
    this._address = address;
    this.validate();
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
}
