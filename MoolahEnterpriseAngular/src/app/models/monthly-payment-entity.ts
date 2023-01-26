import { CompanyEntity } from "./company-entity";
import { PaymentEntity } from "./payment-entity";
import { ProductLineItemEntity } from "./product-line-item-entity";

export class MonthlyPaymentEntity extends PaymentEntity {

  listOfProductLineItems: ProductLineItemEntity[] = new Array();
  totalPayable: number | undefined;

  constructor(dateGenerated: Date, dateTransacted: Date, listOfProductLineItems?: ProductLineItemEntity[], paid?: boolean,
    paymentNumber?: string, totalPayable?: number, company?: CompanyEntity, paymentId?: number) {
      super(dateGenerated, dateTransacted, paymentNumber, paid, company, paymentId);
    this.totalPayable = totalPayable;
  }
}
