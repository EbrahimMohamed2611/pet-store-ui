import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input('product-item') product: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
