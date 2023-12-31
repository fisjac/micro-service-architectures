import { Publisher, Subjects, TicketCreatedEvent } from "@jf-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
};
