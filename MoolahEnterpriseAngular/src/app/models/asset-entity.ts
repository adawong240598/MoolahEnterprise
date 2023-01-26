export class AssetEntity {
    assetId : number | undefined;
    cashInHand : number | undefined;
    monthlyExpense : number | undefined;
    investments : number | undefined;
    monthlyIncome : number | undefined;

    constructor(assetId?: number, cashInHand?: number, monthlyExpense?: number, investments?: number, monthlyIncome?: number){
        this.assetId = assetId;
        this.cashInHand = cashInHand;
        this.monthlyExpense = monthlyExpense;
        this.investments = investments;
        this.monthlyIncome = monthlyIncome;

    }



}
