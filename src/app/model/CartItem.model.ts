import { Product } from "./Product.model";

export class CartItem {
    public quantity: number;
    public product: Product = new Product();

    constructor() {

    }

}
