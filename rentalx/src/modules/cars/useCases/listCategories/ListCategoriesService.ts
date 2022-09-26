import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesService {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoryRepository.list();

    return categories;
  }
}

export { ListCategoriesService };