import { CategoryPricingEntity } from "./category-pricing-entity";
import { EndowmentProductEnum } from "./enums/endowment-product-enum.enum";
import { PolicyCurrencyEnum } from "./enums/policy-currency-enum.enum";
import { ProductEntity } from "./product-entity";

export class CreateEndowmentEntityReq {
    productEnum: EndowmentProductEnum | undefined;

    constructor(productEnum?: EndowmentProductEnum, productName?: string, coverageTerm?: number,
        assuredSum?: number, description?: string, isDeleted?: boolean, premiumTerm?: number, currency?: PolicyCurrencyEnum,
        pricing?: CategoryPricingEntity, averageInterestRate?: number, isAvailableToSmoker?: boolean) {

        super(productName, coverageTerm, assuredSum, description, isDeleted, premiumTerm, currency, pricing, averageInterestRate, isAvailableToSmoker);
        this.productEnum = productEnum;

    }
}
