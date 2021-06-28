import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/Product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../service/search/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchKeyword = '';
  products: Product[] = [];
  count: number;
  pageLimit = 24;
  page = 1;
  math = Math;

  constructor(private _searchService: SearchService, private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.searchKeyword = params.get('query') as string;
      this.searchProducts(this.searchKeyword);
    });
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.searchProducts(this.searchKeyword);
  }

  private searchProducts(name: string): void {
    this._searchService.searchProducts(name, this.page - 1, this.pageLimit).subscribe(response => {
        if (response !== null) {
          this.products = response.products;
          this.count = response.count;
        } else {
          this._router.navigateByUrl('/shop');
        }
      }
      , (error) => {
        // console.log(error.message)
      });
  }

  applyFilters(): void {
    this.searchProducts(this.searchKeyword);
  }
}
