import { Category } from "@components/categories/domain/category";
import { CategoryMap } from "@components/categories/categories.map";
import { database } from "@infra/database/database";

interface ICategoryRepo {
  exists(categoryName: string): Promise<boolean>;
  save(category: Category): Promise<Category>;
}

class CategoryRepo implements ICategoryRepo {
  /* eslint-disable class-methods-use-this */
  async exists(categoryName: string): Promise<boolean> {
    const category = await database.productCategory.findUnique({
      where: { name: categoryName },
    });
    return !!category;
  }

  async save(category: Category): Promise<Category> {
    const createdCategory = await database.productCategory.create({
      data: CategoryMap.toPersistence(category),
    });
    return CategoryMap.toDomain(createdCategory);
  }
}

const categoryRepo = new CategoryRepo();

export { categoryRepo, ICategoryRepo };
