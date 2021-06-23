import { Service } from "./Service.model";

export class ServicePage {

    private allServices: Service[];
    private count: number;

    constructor() {
        this.allServices = [];
    }

    get services(): Service[] {
        return this.allServices;
    }

    get numberOfServices(): number {
        return this.count;
    }

}