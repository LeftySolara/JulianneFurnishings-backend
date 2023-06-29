import { Property } from "@components/properties/domain/property";
import { PropertyDTO } from "@components/properties/domain/propertyDTO";
import { Name } from "@components/properties/domain/name";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Slug } from "@domain/slug";

interface RawPropertyProps {
  uuid: string;
  slug: string | null;
  name: string;
}

class PropertyMap {
  public static toDTO(property: Property): PropertyDTO {
    return {
      uuid: property.uuid.props.value,
      slug: property.entitySlug.props.value,
      name: property.name.value,
    };
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public static toPersistence(property: Property): any {
    return {
      uuid: property.uuid.props.value,
      slug: property.entitySlug.props.value,
      name: property.name.value,
    };
  }

  public static toDomain(raw: RawPropertyProps): Property {
    const uuid = new UniqueEntityId({ value: raw.uuid });
    const slug = new Slug(
      raw.slug ? { value: raw.slug } : undefined,
      uuid.props.value,
    );
    const nameResult = Name.create(raw.name);

    if (nameResult.isFailure) {
      throw new Error(nameResult.errorValue.toString());
    }

    const createPropertyResult = Property.create(
      {
        name: nameResult.getValue(),
      },
      uuid,
      slug,
    );

    if (createPropertyResult.isFailure) {
      throw new Error(createPropertyResult.error?.toString());
    }

    return createPropertyResult.getValue();
  }
}

export { PropertyMap };
