import { CompanyEntity } from "./company-entity";
import { PaymentEntity } from "./payment-entity";

export class CreditPaymentEntity extends PaymentEntity {
  creditPurchased: bigint | undefined;
  totalPayable: number | undefined;

  constructor(dateGenerated: Date, dateTransacted: Date, creditPurchased?: bigint, paid?: boolean, paymentNumber?: string,
    totalPayable?: number, company?: CompanyEntity, paymentId?: number) {
    super(dateGenerated, dateTransacted, paymentNumber, paid, company, paymentId);
    this.creditPurchased = creditPurchased;
    this.totalPayable = totalPayable;
  }


}
