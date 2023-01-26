import { CategoryPricingEntity } from "./category-pricing-entity";
import { ClickThroughEntity } from "./click-through-entity";
import { CompanyEntity } from "./company-entity";
import { PolicyCurrencyEnum } from "./enums/policy-currency-enum.enum";
import { WholeLifeProductEnum } from "./enums/whole-life-product-enum.enum";
import { FeatureEntity } from "./feature-entity";
import { PremiumEntity } from "./premium-entity";
import { ProductEntity } from "./product-entity";
import { RiderEntity } from "./rider-entity";


export class WholeLifeProductEntity extends ProductEntity {
    productEnum: WholeLifeProductEnum | undefined;

    constructor(listOfAdditionalFeatures: FeatureEntity[], listOfRiders: RiderEntity[], listOfPremium: PremiumEntity[], listOfSmokerPremium: PremiumEntity[], coverageTerm: number, assuredSum: number, premiumTerm: number, averageInterestRate: number, productName?: string, description?: string, policyCurrency?: PolicyCurrencyEnum, productEnum?: WholeLifeProductEnum,
        isAvailableToSmoker?: boolean, clickThroughInfo?: ClickThroughEntity,
        company?: CompanyEntity | null) {

        super(listOfAdditionalFeatures, listOfRiders, listOfPremium, listOfSmokerPremium, assuredSum, premiumTerm, averageInterestRate, coverageTerm, productName, description, policyCurrency, isAvailableToSmoker, clickThroughInfo,
            company);
        this.productEnum = productEnum;

    }
}
