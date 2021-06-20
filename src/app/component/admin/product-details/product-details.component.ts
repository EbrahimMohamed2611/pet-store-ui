import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/Product.model';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public products:Product[]=[];
  constructor(private productService:ProductService,private toaster:ToastrService) { }

  ngOnInit(): void {
  }
  public getProducts(){
    this.productService.getAllProducts().subscribe((response:Product[])=>{
      this.products=response;
    },(error:HttpErrorResponse)=>{
      this.toaster.error(error.message)
    });
  }
}
