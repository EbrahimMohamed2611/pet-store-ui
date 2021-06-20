import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserDetails } from 'src/app/model/user-details.model';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userDetails:UserDetails[]=[];
  constructor( private userService:UserService,private toaster:ToastrService) { }
 
  ngOnInit(): void {
  }
  private getAllUsers(){
    this.userService.getAllUsers().subscribe((response:UserDetails[])=>{
      this.userDetails=response;
    },(error:HttpErrorResponse)=>{
      this.toaster.error(error.message)
    });
  }
  //todo
public showOrders(id:number){
}
}
