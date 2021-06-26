import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/Service.model';
import { ServiceType } from 'src/app/model/ServiceType.model';
import { ServiceTypeService } from 'src/app/service/service-type/service-type.service';
import { ServiceService } from 'src/app/service/service/service.service';


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

  constructor(private _serviceService: ServiceService, private _typeService: ServiceTypeService) { }

  ngOnInit(): void {
    this._typeService.getAllServicesTypes().subscribe(types => this.types = types, error => console.log(error.message));
    this._serviceService.getAllServices(this.page - 1, this.pageLimit).subscribe(response => {
      this.services = response.allServices;
      this.count = response.count;
    }
      , error => console.log(error.message));
  }

  applyFilters(): void {
    this.page = 1;
    if (this.selectedType == undefined) {
      this._serviceService.getAllServices(this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected).subscribe(response => {
        this.services = response.allServices;
        this.count = response.count;
      }, error => console.log(error.message));
    } else if (this.selectedType != undefined ) {
      this._serviceService.getServicesByType(this.selectedType as number, this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected).subscribe(response => {
        this.services = response.allServices;
        this.count = response.count;
      }, error => console.log(error.message));
    }
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this._serviceService.getAllServices(this.page - 1, this.pageLimit).subscribe(response => {
      this.services = response.allServices;
      this.count = response.count;
    }
      , error => console.log(error.message));
  }

  priceValueChanged(): void {
    let minPrice = document.querySelector(".noUi-handle.noUi-handle-lower");
    let maxPrice = document.querySelector(".noUi-handle.noUi-handle-upper");
    this.minPriceSelected = Number(minPrice?.getAttribute("aria-valuenow"));
    this.maxPriceSelected = Number(maxPrice?.getAttribute("aria-valuenow"));
  }

}