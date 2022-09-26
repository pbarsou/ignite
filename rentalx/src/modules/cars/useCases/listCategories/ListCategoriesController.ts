import { Request, Response } from 'express';
import { ListCategoriesService } from './ListCategoriesService';

class ListCategoriesController {
  constructor(private listCategoryService: ListCategoriesService) {}

  handle(request: Request, response: Response): Response {
    const all = this.listCategoryService.execute();
  
    return response.json(all);
  }
}

export { ListCategoriesController };