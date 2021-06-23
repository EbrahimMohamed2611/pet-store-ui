import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/model/Service.model';

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
    console.log('Product Component');
  }
}


