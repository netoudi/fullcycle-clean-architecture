import { type Notification } from '@app/domain/@shared/notification/notification';

export interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  get notification(): Notification;
}
