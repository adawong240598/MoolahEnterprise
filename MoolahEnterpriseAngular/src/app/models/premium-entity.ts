export class PremiumEntity {
    premiumId: number | undefined;
    minAgeGroup: number | undefined;
    maxAgeGroup: number | undefined;
    premiumValue: number | undefined;

    constructor(premiumId?: number, minAgeGroup?: number, maxAgeGroup?: number, premiumValue?: number) {
        this.premiumId = premiumId;
        this.minAgeGroup = minAgeGroup;
        this.maxAgeGroup = maxAgeGroup;
        this.premiumValue = premiumValue;
    }
}
