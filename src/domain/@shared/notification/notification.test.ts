import { Notification } from '@app/domain/@shared/notification/notification';

describe('unit tests for notifications', () => {
  it('should create errors', () => {
    const notification = new Notification();

    // error 1
    const error1 = {
      message: 'error message 1',
      context: 'customer',
    };
    notification.addError(error1);
    expect(notification.messages('customer')).toBe('customer: error message 1');

    // error 2
    const error2 = {
      message: 'error message 2',
      context: 'customer',
    };
    notification.addError(error2);
    expect(notification.messages('customer')).toBe('customer: error message 1,customer: error message 2');

    // error 3
    const error3 = {
      message: 'error message 3',
      context: 'order',
    };
    notification.addError(error3);
    expect(notification.messages('customer')).toBe('customer: error message 1,customer: error message 2');

    // all errors
    expect(notification.messages()).toBe('customer: error message 1,customer: error message 2,order: error message 3');
  });

  it('should check if notification has at least one error', () => {
    const notification = new Notification();
    const error = {
      message: 'error message',
      context: 'customer',
    };

    expect(notification.hasErrors()).toBeFalsy();

    notification.addError(error);

    expect(notification.hasErrors()).toBeTruthy();
  });

  it('should get all errors props', () => {
    const notification = new Notification();
    const error = {
      message: 'error message',
      context: 'customer',
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });
});
