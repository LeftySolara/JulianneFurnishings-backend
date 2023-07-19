import { PropertyDTO } from "@components/properties/domain/propertyDTO";

type BrandDTO = PropertyDTO;

interface CreateBrandDTO {
  name: string;
}

export { BrandDTO, CreateBrandDTO };
