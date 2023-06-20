import { Notification } from '@app/domain/@shared/notification/notification';

export abstract class Entity {
  protected _id: string;
  protected _notifications: Notification;

  constructor(id: string) {
    this._id = id;
    this._notifications = new Notification();
  }

  get id(): string {
    return this._id;
  }
}
