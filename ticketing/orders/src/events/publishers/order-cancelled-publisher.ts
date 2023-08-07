import { Publisher, OrderCancelledEvent, Subjects } from '@jf-ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
