import {Brand} from './Brand.model';
import {Category} from './Category.model';
import {Rate} from './Rate.model';
import {Species} from './Species.model';
import {Image} from './Image.model';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category = new Category();
  brand: Brand = new Brand();
  discount: number;
  avaialble?: boolean;
  rates: Rate[] = [];
  species: Species = new Species();
  images: Image[] = [];
  // @Schema(description = "Product species")
  // private Species species;


  constructor() {
  }
}
