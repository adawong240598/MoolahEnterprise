import { ProductEntity } from "./product-entity";

export class ProductLineItemEntity {
    prodcutLineItemId: number | undefined;
    product : ProductEntity | undefined;
    monthlyClicks : number | undefined;
    monthlySubtotalCredit : number | undefined;
    fixedSubscriptionCredit : number | undefined;

    constructor(prodcutLineItemId ?: number, product ?: ProductEntity, monthlyClicks ?: number,
        monthlySubtotalCredit ?: number, fixedSubscriptionCredit ?: number){
            this.prodcutLineItemId = prodcutLineItemId;
            this.product = product;
            this.monthlyClicks = monthlyClicks;
            this.monthlySubtotalCredit = monthlySubtotalCredit;
            this.fixedSubscriptionCredit = fixedSubscriptionCredit;
        }
}
