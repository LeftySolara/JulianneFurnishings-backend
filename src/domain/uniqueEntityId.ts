import { v5 as uuidv5, validate as uuidValidate } from "uuid";
import { ValueObject } from "@domain/valueObject";
import { appConfig } from "@utils/appConfig";

interface UniqueEntityIdProps {
  value: string;
}

/**
 * Entity IDs are stored in UUID format.
 */
class UniqueEntityId extends ValueObject<UniqueEntityIdProps> {
  /* eslint-disable-next-line no-useless-constructor */
  constructor(props?: UniqueEntityIdProps) {
    /* If no UUID is given, generate a new one. */
    if (!props || props.value.length === 0) {
      super({
        value: uuidv5(
          appConfig.uuid.name as string,
          appConfig.uuid.namespace as string,
        ),
      });
    } else {
      super(props);
    }
  }

  /**
   * Check whether an ID is a valid UUID.
   *
   * @returns {boolean} True if the ID is valid, or false otherwise.
   */
  public isValid(): boolean {
    return uuidValidate(this.props.value);
  }
}

export { UniqueEntityId };
