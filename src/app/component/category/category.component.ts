import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category/category.service';
import {Category} from '../../model/Category.model';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public allCategories: Category[];

  constructor(private categoryService: CategoryService,
              private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  // @ts-ignore
  public getAllCategories(): Category[]{
    this.categoryService.getAllCategory().subscribe((response: Category[]) => {
      this.toasterService.success("All Categories ")
      this.allCategories = response;
      console.log(this.allCategories);
    }, (error:HttpErrorResponse) => {
      this.toasterService.error(error.message)
      console.log(error);
    });
  }
}
