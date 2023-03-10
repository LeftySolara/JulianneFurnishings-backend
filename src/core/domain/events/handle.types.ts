/* eslint-disable @typescript-eslint/no-unused-vars,no-unused-vars */

export interface IHandle<IDomainEventType> {
  setupSubscriptions(): void;
}
