import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Service } from 'src/app/model/Service.model';
import { ServiceRate } from 'src/app/model/ServiceRate.model';
import { ServiceService } from 'src/app/service/service/service.service';
@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.css']
})
export class ServiceInfoComponent implements OnInit {
  firstCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      1200: {items: 5},
      992: {items: 4},
      768: {items: 3},
      480: {items: 5},
      380: {items: 4},
      0: {items: 3}
    },
    nav: true
  };
  service: Service;
  selectedTab = 'description';


  constructor(private _activatedRoute: ActivatedRoute, private _serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._serviceService.getService(+params['id']).subscribe(service => {
        this.service =service;
        // this._productService.getCategoryProducts(product.category.id).subscribe(products => {
        //   this.relatedProducts = products.products;
        //   let index = this.relatedProducts.indexOf(this.product);
        //   this.relatedProducts.splice(index, 1);
        // });
      });
    });
  }
  getAvgRate(rates: ServiceRate[]): number {
    if (rates !== null) {
      const rating = Math.floor(rates.map(rate => rate.rateNumber).reduce((p, c) => p + c, 0) / rates.length);
      return Number.isNaN(rating) ? 0 : rating;
    } else {
      return 0;
    }

}
}
