export class FeatureEntity {

    featureId : number | null;
    featureName : string | undefined;
    featureDescription : string | undefined;

    constructor( featureName ?: string, featureDescription ?: string){
        this.featureId = null;
        this.featureName = featureName;
        this.featureDescription = featureDescription;
    }

}

