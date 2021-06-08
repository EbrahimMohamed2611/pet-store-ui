import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category/category.service';
import {Category} from '../../model/Category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public allCategories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  // @ts-ignore
  public getAllCategories(): Category[]{
    this.categoryService.getAllCategory().subscribe((response: Category[]) => {
      this.allCategories = response;
      console.log(this.allCategories);
    }, (error) => {
      console.log(error);
    });
  }
}
