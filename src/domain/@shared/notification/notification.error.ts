import { type NotificationErrorProps } from '@app/domain/@shared/notification/notification';

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(errors.map((error) => `${error.context}: ${error.message}`).join(','));
  }
}
