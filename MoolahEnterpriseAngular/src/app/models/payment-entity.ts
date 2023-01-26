import { CompanyEntity } from "./company-entity";

export class PaymentEntity {
    paymentId: number | undefined;
    paid: boolean | undefined;
    dateTransacted: Date | null;
    paymentNumber: string | undefined;
    dateGenerated: Date | null;
    company: CompanyEntity | undefined;

    constructor(dateGenerated: Date, dateTransacted: Date, paymentNumber?: string,
         paid?: boolean, company?: CompanyEntity, paymentId?: number) {
        this.paymentId = paymentId;
        this.paid = paid;
        this.dateTransacted = dateTransacted;
        this.paymentNumber = paymentNumber;
        this.dateGenerated = dateGenerated;
        this.company = company;

    }

}
