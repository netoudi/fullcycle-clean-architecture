import { type EventInterface } from '@app/domain/event/@shared/event.interface';

export class ProductCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}