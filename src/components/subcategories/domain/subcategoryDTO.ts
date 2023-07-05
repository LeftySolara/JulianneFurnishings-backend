import { PropertyDTO } from "@components/properties/domain/propertyDTO";

type SubcategoryDTO = PropertyDTO;

interface CreateSubcategoryDTO {
  name: string;
}

export { SubcategoryDTO, CreateSubcategoryDTO };
