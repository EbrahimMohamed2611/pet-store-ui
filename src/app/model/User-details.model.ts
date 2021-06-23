import { Address } from "./Address.model";

export class UserDetails {
    id:number;
    email:string;
    role:string;
    phoneNumber:string;
    address:Address=new Address();

}
