import { CompanyEntity } from "./company-entity";

export class RefundEntity {
    refundId: number | undefined;
    refundDate: Date | undefined;
    totalAmount: number | undefined;
    company: CompanyEntity | undefined;

    constructor(refundId?: number, refundDate?: Date, totalAmount?: number, company?: CompanyEntity) {
        this.refundId = refundId;
        this.refundDate = refundDate;
        this.totalAmount = totalAmount;
        this.company = company;
    }
}
