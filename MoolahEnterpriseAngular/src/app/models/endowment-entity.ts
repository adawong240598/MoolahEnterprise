import { CategoryPricingEntity } from "./category-pricing-entity";
import { ClickThroughEntity } from "./click-through-entity";
import { CompanyEntity } from "./company-entity";
import { EndowmentProductEnum } from "./enums/endowment-product-enum.enum";
import { PolicyCurrencyEnum } from "./enums/policy-currency-enum.enum";
import { FeatureEntity } from "./feature-entity";
import { PremiumEntity } from "./premium-entity";
import { ProductEntity } from "./product-entity";
import { RiderEntity } from "./rider-entity";

export class EndowmentEntity extends ProductEntity {
    productEnum: EndowmentProductEnum | undefined;

    constructor(listOfAdditionalFeatures: FeatureEntity[], listOfRiders: RiderEntity[], listOfPremium: PremiumEntity[], listOfSmokerPremium: PremiumEntity[], coverageTerm: number, assuredSum: number, premiumTerm: number, averageInterestRate: number, productEnum?: EndowmentProductEnum, productName?: string, description?: string, policyCurrency?: PolicyCurrencyEnum,
        isAvailableToSmoker?: boolean, clickThroughInfo?: ClickThroughEntity,
        company?: CompanyEntity | null) {

        super(listOfAdditionalFeatures, listOfRiders, listOfPremium, listOfSmokerPremium, assuredSum, premiumTerm, averageInterestRate, coverageTerm, productName, description, policyCurrency, isAvailableToSmoker, clickThroughInfo,
            company);
        this.productEnum = productEnum;

    }
}
