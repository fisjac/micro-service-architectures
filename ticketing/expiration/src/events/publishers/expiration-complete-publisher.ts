import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@jf-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
