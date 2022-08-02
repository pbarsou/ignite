import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {

  private categories: Category[];

  constructor() {
    this.categories = [];
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
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}

export { CategoriesRepository };