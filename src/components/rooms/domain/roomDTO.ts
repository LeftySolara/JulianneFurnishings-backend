import { PropertyDTO } from "@components/properties/domain/propertyDTO";

type RoomDTO = PropertyDTO;

interface CreateRoomDTO {
  name: string;
}

export { RoomDTO, CreateRoomDTO };
