import {Address} from "./Address.model";

export class Order {
  customerNotes: string;
  address: Address = new Address();

  constructor() {

  }
}
