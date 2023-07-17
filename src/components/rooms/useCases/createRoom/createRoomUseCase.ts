import { Either, Result, left, right } from "@utils/result";
import { UseCase } from "@domain/useCase";
import { IRoomRepo } from "@components/rooms/rooms.repository";
import { Name } from "@components/properties/domain/name";
import { Room } from "@components/rooms/domain/room";
import { CreateRoomDTO, RoomDTO } from "@components/rooms/domain/roomDTO";
import { RoomMap } from "@components/rooms/rooms.map";
import { CreateRoomErrors } from "@components/rooms/useCases/createRoom/createRoomErrors";

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/indent */
type Response = Either<
  CreateRoomErrors.InvalidNameLength | Result<any>,
  Result<RoomDTO>
>;

class CreateRoomUseCase implements UseCase<CreateRoomDTO, Promise<Response>> {
  private repo: IRoomRepo;

  constructor(roomRepo: IRoomRepo) {
    this.repo = roomRepo;
  }

  async execute(request: CreateRoomDTO): Promise<Response> {
    const nameResult = Name.create(request.name);
    if (nameResult.isFailure) {
      return left(Result.fail<void>(nameResult.error)) as Response;
    }

    const roomOrError = Room.create({
      name: nameResult.getValue(),
    });

    if (roomOrError.isFailure) {
      return left(Result.fail<void>(roomOrError.error)) as Response;
    }

    const room: Room = roomOrError.getValue();

    try {
      await this.repo.save(room);
    } catch (err: unknown) {
      return left(Result.fail<void>((err as Error).stack));
    }

    return right(Result.ok<RoomDTO>(RoomMap.toDTO(room))) as Response;
  }
}

export { CreateRoomUseCase };
