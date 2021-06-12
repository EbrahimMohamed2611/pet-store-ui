import {Category} from './Category.model';

export class Product{
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category = new Category();
  brand: string;
  discount: number;
  avaialble: boolean;
  // private Set<ProductImageDTO> images = new HashSet<>();
  // @Schema(description = "Product species")
  // private Species species;
}
