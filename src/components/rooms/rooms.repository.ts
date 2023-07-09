import { Room } from "@components/rooms/domain/room";
import { RoomMap } from "@components/rooms/rooms.map";
import { database } from "@infra/database/database";

interface IRoomRepo {
  exists(roomName: string): Promise<boolean>;
  save(room: Room): Promise<Room>;
}

class RoomRepo implements IRoomRepo {
  /* eslint-disable class-methods-use-this */
  async exists(roomName: string): Promise<boolean> {
    const room = await database.productRoom.findUnique({
      where: { name: roomName },
    });
    return !!room;
  }

  async save(room: Room): Promise<Room> {
    const createdRoom = await database.productRoom.create({
      data: RoomMap.toPersistence(room),
    });
    return RoomMap.toDomain(createdRoom);
  }
}

const roomRepo = new RoomRepo();

export { roomRepo, IRoomRepo };
