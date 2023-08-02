import { Publisher, Subjects, TicketUpdatedEvent } from "@jf-ticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
};
