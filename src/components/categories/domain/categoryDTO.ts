import { PropertyDTO } from "@components/properties/domain/propertyDTO";

type CategoryDTO = PropertyDTO;

interface CreateCategoryDTO {
  name: string;
}

export { CategoryDTO, CreateCategoryDTO };
