import {Brand} from './Brand.model';
import {Category} from './Category.model';
import {Rate} from './Rate.model';
import {Species} from './Species.model';
import {Image} from './Image.model';

export class Product {
  id?: number;
  name: string = "";
  description: string = "";
  price: number = 0;
  quantity: number = 0;
  category: Category = new Category();
  brand: Brand = new Brand();
  discount: number = 0;
  avaialble?: boolean = false;
  rates: Rate[] = [];
  species: Species = new Species();
  images: Image[] = [];
  // @Schema(description = "Product species")
  // private Species species;


  constructor() {
  }
}
