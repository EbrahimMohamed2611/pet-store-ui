import { Rate } from "./Rate.model";
import { ServiceProvider } from "./ServiceProvider.model";
import { ServiceType } from "./ServiceType.model";

export class Service{

  id?:number;
  name:string;
  price:number;
  description:string;
  discount:number;
  startTime:Date;
  endTime:Date;
  rates: Rate[] = [];
  //TODO how to calculate time difference
  timePerService:Date;
  deliverable:boolean;
  provider:ServiceProvider= new ServiceProvider();
  type:ServiceType= new ServiceType();
}
