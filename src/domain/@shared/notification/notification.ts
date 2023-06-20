export interface NotificationErrorProps {
  message: string;
  context: string;
}

export class Notification {
  private readonly _errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps): void {
    this._errors.push(error);
  }

  hasErrors(): boolean {
    return this._errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this._errors;
  }

  messages(context?: string): string {
    const messages: string[] = [];

    this._errors.forEach((error) => {
      if (context === undefined || error.context === context) {
        messages.push(`${error.context}: ${error.message}`);
      }
    });

    return messages.join(',');
  }
}
