/* eslint-disable no-use-before-define */
import { Slug } from "./slug";
import { UniqueEntityId } from "./uniqueEntityId";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

abstract class Entity<T> {
  protected readonly id: UniqueEntityId;

  protected readonly slug: Slug;

  protected props: T;

  get uuid(): UniqueEntityId {
    return this.id;
  }

  get entitySlug(): Slug {
    return this.slug;
  }

  constructor(props: T, id?: UniqueEntityId, slug?: Slug) {
    this.id = id ?? new UniqueEntityId();
    this.slug = slug ?? new Slug(undefined, this.id.props.value);
    this.props = props;
  }

  /**
   * Entities are compared based on their referential equality.
   *
   * @param object The object to compare to.
   *
   * @returns True if the entities are equal, or false otherwise.
   */
  public equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.id.equals(object.id);
  }
}

export { Entity };
