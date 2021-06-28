import {Component, OnInit} from '@angular/core';
import {Service} from 'src/app/model/Service.model';
import {ServiceType} from 'src/app/model/ServiceType.model';
import {ServiceTypeService} from 'src/app/service/service-type/service-type.service';
import {ServiceService} from 'src/app/service/service/service.service';
import {ChangeContext, LabelType, Options} from '@angular-slider/ngx-slider';
import {Router} from '@angular/router';


@Component({
  selector: 'app-services-shop',
  templateUrl: './services-shop.component.html',
  styleUrls: ['./services-shop.component.css']
})
export class ServicesShopComponent implements OnInit {

  services: Service[];
  types: ServiceType[];
  count: number;
  pageLimit = 12;
  page = 1;
  selectedType: any;
  minPriceSelected: number;
  maxPriceSelected: number;
  math = Math;
  options: Options = {
    floor: 0,
    ceil: 100000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `<b  class="price-min-value">Min: EGP${value}</b>`;
        case LabelType.High:
          return `<b  class="price-max-value">Max: EGP${value}</b>`;
        default:
          return `EGP${value}`;
      }
    }
  };

  constructor(private _serviceService: ServiceService, private _typeService: ServiceTypeService, private _router: Router) {
  }

  ngOnInit(): void {
    this._typeService.getAllServicesTypes().subscribe(types => this.types = types, error => console.log(error.message));
    this._serviceService.getAllServices(this.page - 1, this.pageLimit).subscribe(response => {
        this.services = response.services;
        this.count = response.count;
      }
      , error => console.log(error.message));
  }

  applyFilters(): void {
    this.page = 1;
    if (this.selectedType === undefined) {
      this._serviceService.getAllServices(this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected).subscribe(response => {
        this.services = response.services;
        this.count = response.count;
      }, error => console.log(error.message));
    } else if (this.selectedType !== undefined) {
      this._serviceService.getServicesByType(this.selectedType as number, this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected).subscribe(response => {
        this.services = response.services;
        this.count = response.count;
      }, error => console.log(error.message));
    }
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this._serviceService.getAllServices(this.page - 1, this.pageLimit).subscribe(response => {
      if(response !== null) {
        this.services = response.services;
        this.count = response.count;
      } else {
        this._router.navigateByUrl('/home');
      }
      }
      , error => console.log(error.message));
  }

  priceValueChanged(changeContext: ChangeContext): void {
    this.minPriceSelected = changeContext.value;
    this.maxPriceSelected = changeContext.highValue as number;
  }

}
