import { v4 as uuidV4 } from 'uuid';

class Category {
  id?: string; // indicando como opcional pois só precisaríamos passar o id quando o objeto estivesse em criação
  
  name: string;
  
  description: string;
  
  created_at: Date;

  constructor() {
    if(!this.id){
      this.id = uuidV4();
    }
  }
}

export { Category };