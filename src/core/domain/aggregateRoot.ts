import { Entity } from "@core/domain/entity";
import { DomainEvents } from "@core/domain/events/domainEvents";
import { IDomainEvent } from "@core/domain/events/domainEvent.types";
import logger from "@utils/logger";

export abstract class AggregateRoot<T> extends Entity<T> {
  public domainEvents: IDomainEvent[] = [];

  /* Add a domain event to this aggregate's list of domain events. */
  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this.domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this.domainEvents.splice(0, this.domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);

    if (thisClass && domainEventClass) {
      logger.info(
        `[Domain Event Created]: ${thisClass.constructor.name} ==> ${domainEventClass.constructor.name}`,
      );
    }
  }
}
