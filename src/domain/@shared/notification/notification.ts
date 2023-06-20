export interface NotificationError {
  message: string;
  context: string;
}

export class Notification {
  private readonly _errors: NotificationError[] = [];

  addError(error: NotificationError): void {
    this._errors.push(error);
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
