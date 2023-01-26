export class ClickThroughEntity {
    clickThroughId : number | undefined;
    monthCounter : bigint | undefined;
    overallCounter : bigint | undefined;

    constructor(clickThroughId? : number, monthCounter? : bigint, overallCounter? : bigint){
        this.clickThroughId = clickThroughId;
        this.monthCounter = monthCounter;
        this.overallCounter = overallCounter;
    }

}
