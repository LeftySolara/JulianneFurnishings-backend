import { AggregateRoot } from "@core/domain/aggregateRoot";
import { IDomainEvent } from "./domainEvent.types";

/**
 * An object containing arrays of event handlers.
 * Each property is the name of the event type, while each value
 * is an array of callback functions that will be executed
 * when the event is dispatched.
 *
 * @type {Object.<string, Array<(event: IDomainEvent) => void>>}
 */
interface IHandlersMap {
  [index: string]: Array<(event: IDomainEvent) => void>;
}

export class DomainEvents {
  private static handlersMap: IHandlersMap = {};

  private static markedAggregates: AggregateRoot<any>[] = [];

  /**
   * Called by aggregate root objects that have created domain events
   * to eventually be dispatched.
   *
   * @param {AggregateRoot<any>} aggregate - The aggregate to mark.
   */
  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateById(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  /**
   * Dispatch all registered events on a single aggregate.
   *
   * @param {AggregateRoot<any>} aggregate - The aggregate whose events to dispatch.
   */
  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event),
    );
  }

  /**
   * Remove an agregate from the list of aggregates to be dispatched.
   *
   * @param {AggregateRoot<any>} aggregate - The aggregate to be removed.
   */
  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>,
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  /**
   * Find a marked aggregate by its ID.
   *
   * @param {string} id - The ID of the aggregate.
   */
  private static findMarkedAggregateById(
    id: string,
  ): AggregateRoot<any> | null {
    let found: AggregateRoot<any> | null = null;
    this.markedAggregates.forEach((aggregate) => {
      if (aggregate.id === id) {
        found = aggregate;
      }
    });

    return found;
  }

  /**
   * Dispatch all events on an aggregate and remove it from the list of marked aggregates.
   *
   * @param {string} id - The ID of the aggregate.
   */
  public static dispatchEventsForAggregate(id: string): void {
    const aggregate = this.findMarkedAggregateById(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  /**
   * Register a new domain event handler. These are the functions that run
   * when a domain event is dispatched.
   *
   * @param {function} callback - The callback function to run when the event is dispatched.
   * @param {string} eventClassName - The class name of the event.
   */
  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string,
  ): void {
    if (
      !Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  /**
   * Remove all domain event handlers.
   */
  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  /**
   * Remove all marked aggregates.
   */
  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (
      Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      const handlers: any[] = this.handlersMap[eventClassName];
      handlers.forEach((handler) => handler(event));
    }
  }
}
