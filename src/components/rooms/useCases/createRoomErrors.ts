import { UseCaseError } from "@domain/useCaseError";
import { Result } from "@utils/result";

export namespace CreateRoomErrors {
  export class InvalidNameLength extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Room name must be less than 256 characters.",
      } as UseCaseError);
    }
  }
}
