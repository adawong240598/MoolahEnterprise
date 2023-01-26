import { CategoryEnum } from "./enums/category-enum.enum";

export class CategoryPricingEntity {

    categoryPricingId : number | undefined;
    categoryType : CategoryEnum | undefined;
    fixedSubscriptionCredit : bigint | undefined;
    creditPerClick : bigint | undefined;

    constructor(categoryPricingId? : number, categoryType? : CategoryEnum, fixedSubscriptionCredit? : bigint, creditPerClick? : bigint){
        this.categoryPricingId = categoryPricingId;
        this.categoryType = categoryType;
        this.fixedSubscriptionCredit = fixedSubscriptionCredit;
        this.creditPerClick = creditPerClick;
    }

}
