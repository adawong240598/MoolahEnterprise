export class RiderEntity {
    riderId: number | null;
    riderName: string | undefined;
    riderPremiumValue: number | undefined;
    riderDescription: string | undefined;

    constructor(riderName?: string, riderPremiumValue?: number, riderDescription?: string) {
        this.riderId = null;
        this.riderName = riderName;
        this.riderPremiumValue = riderPremiumValue;
        this.riderDescription = riderDescription;
    }
}
