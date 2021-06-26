import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/model/Service.model';
import { ServiceRate } from 'src/app/model/ServiceRate.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @Input('service-item') service: Service;


  constructor(private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    
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

