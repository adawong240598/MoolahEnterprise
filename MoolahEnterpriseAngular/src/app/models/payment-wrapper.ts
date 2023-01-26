import { PaymentEntity } from "./payment-entity";
import { MonthlyPaymentEntity } from "./monthly-payment-entity";
import { ProductLineItemEntity } from "./product-line-item-entity";
import { CreditPaymentEntity } from "./credit-payment-entity";


export class PaymentWrapper {
    paymentEntity: PaymentEntity = new PaymentEntity(new Date(), new Date());
    totalPayable: number = 0;
    listOfProductLineItemEntity: Array<ProductLineItemEntity> = new Array();
    creditPaymentEntity : CreditPaymentEntity = new CreditPaymentEntity(new Date(), new Date());


    constructor(paymentEntity: PaymentEntity, totalPayable: number, listOfProductLineItemEntity: Array<ProductLineItemEntity>,creditPaymentEntity : CreditPaymentEntity ) {
        this.totalPayable = totalPayable;
        this.paymentEntity = paymentEntity;
        this.listOfProductLineItemEntity = listOfProductLineItemEntity;
        this.creditPaymentEntity = creditPaymentEntity;
    }
}
