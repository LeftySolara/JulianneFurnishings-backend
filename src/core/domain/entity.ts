import { v4 as uuidv4 } from "uuid";

/* eslint-disable no-use-before-define */
const isEntity = (object: any): object is Entity<any> => {
  return object instanceof Entity;
};

/**
 * Class representing a domain entity.
 *
 * All domain entities use UUIDs as their unique identifying attribute.
 */
export abstract class Entity<T> {
  protected readonly uuid: string;

  public readonly props: T;

  get id(): string {
    return this.uuid;
  }

  public constructor(props: T, uuid?: string) {
    this.uuid = uuid || uuidv4();
    this.props = props;
  }

  /**
   * Check whether two entities are the same.
   *
   * @param {Entity<T>} object - The entity to compare to.
   *
   * @returns {boolean} True if the entities are the same, or false otherwise.
   */
  public equals(object: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }
    if (object === this) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }

    return object.uuid === this.uuid;
  }
}
