import { CompanyEntity } from "./company-entity";
import { PointOfContactEntity } from "./point-of-contact-entity";

export class CreateCompanyEntityReq {
    companyEntity: CompanyEntity = new CompanyEntity();
    listOfPointOfContacts: PointOfContactEntity[] = new Array();

    constructor() {

    }


}
