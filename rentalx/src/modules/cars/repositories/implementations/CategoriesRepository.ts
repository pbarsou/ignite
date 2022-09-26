import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {

  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if(!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category(); // 'new Category()' para chamar o método constructor seja chamado

    Object.assign(category, { // substitui a atribuição dos atributos no constructor
      name,
      description,
      created_at: new Date()
    });

    this.categories.push(category);

    console.log(this.categories);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find(
      category => category.name === name
    );
    return category;
  }
}

export { CategoriesRepository };