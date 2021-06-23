import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/model/Service.model';
import { ServiceService } from 'src/app/service/service/service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  public services:Service[]=[];
  constructor(private service:ServiceService,private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  public getAllServices(){
    this.service.getAllServices().subscribe((response:Service[])=>{
      this.services=response;
    },(error:HttpErrorResponse)=>{
      this.toaster.error(error.message)
    });
  }
}
