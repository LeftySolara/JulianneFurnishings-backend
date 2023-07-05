import { Subcategory } from "@components/subcategories/domain/subcategory";
import { SubcategoryMap } from "@components/subcategories/subcategories.map";
import { database } from "@infra/database/database";

interface ISubcategoryRepo {
  exists(subcategoryName: string): Promise<boolean>;
  save(subcategory: Subcategory): Promise<Subcategory>;
}

class SubcategoryRepo implements ISubcategoryRepo {
  /* eslint-disable class-methods-use-this */
  async exists(subcategoryName: string): Promise<boolean> {
    const subcategory = await database.productSubcategory.findUnique({
      where: { name: subcategoryName },
    });
    return !!subcategory;
  }

  async save(subcategory: Subcategory): Promise<Subcategory> {
    const createdSubcategory = await database.productSubcategory.create({
      data: SubcategoryMap.toPersistence(subcategory),
    });
    return SubcategoryMap.toDomain(createdSubcategory);
  }
}

const subcategoryRepo = new SubcategoryRepo();

export { subcategoryRepo, ISubcategoryRepo };
