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

  // id?:number;
  // name:string;
  // price:number;
  // description:string;
  // discount:number;
  // startTime:Date;
  // endTime:Date;
  services: Service[];
  servicesTypes: ServiceType[];

  count: number;
  pageLimit = 12;
  page = 1;
  selectedServiceType: any;

  minPriceSelected: number;
  maxPriceSelected: number;
  math = Math;

  constructor(private serviceService: ServiceService, private serviceTypeService: ServiceTypeService) { }

  ngOnInit(): void {
    this.serviceTypeService.getAllServicesTypes().subscribe(
      (response) => {
        this.servicesTypes = response;
        console.log('response => ', response);
      },
      (error: HttpErrorResponse) => {
        console.log('error => ', error);
      }
    );


    this.getServicePage(1);
  }



  applyFilters(): void {
    
    if (this.selectedServiceType == undefined) {
      this.getServicePage(1);

    } else if (this.selectedServiceType != undefined) {
      this.serviceService.getServiceByTypePaginated(this.selectedServiceType as number, this.page - 1, this.pageLimit, this.minPriceSelected, this.maxPriceSelected)
        .subscribe(
          (response) => {
            this.services = response.services;
            this.count = response.numberOfServices;
          }
          , (error) => console.log(error.message)
        );
    }
  }

    pageChanged(pageNumber: number): void {
      
      this.getServicePage(pageNumber);
    }

    priceValueChanged(): void {
      let minPrice = document.querySelector(".noUi-handle.noUi-handle-lower");
      let maxPrice = document.querySelector(".noUi-handle.noUi-handle-upper");
      this.minPriceSelected = Number(minPrice?.getAttribute("aria-valuenow"));
      this.maxPriceSelected = Number(maxPrice?.getAttribute("aria-valuenow"));
    }


    private getServicePage(pageNumber: number) {
      this.serviceService.getServicePaginated(pageNumber - 1, this.pageLimit).subscribe(
        (response) => {
          this.services = response.services;
          this.count = response.numberOfServices;
        },
        error => console.log(error.message));
    }
  }
