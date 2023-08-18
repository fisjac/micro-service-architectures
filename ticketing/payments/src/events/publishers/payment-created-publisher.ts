import { Subjects, Publisher, PaymentCreatedEvent } from '@jf-ticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
