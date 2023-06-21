import { Entity } from '@app/domain/@shared/entity/entity.abstract';
import { NotificationError } from '@app/domain/@shared/notification/notification.error';
import { type ProductInterface } from '@app/domain/product/entity/product.interface';
import { ProductValidatorFactory } from '@app/domain/product/factory/product.validator.factory';

export class ProductB extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super(id);
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate(): void {
    ProductValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price * 2;
  }
}
