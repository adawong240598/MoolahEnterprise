import { ProductEntity } from "./product-entity";

export class ProductEntityWrapper {
    product : ProductEntity;
    productEnum : string;
    productType : string;
    isSmoker : string

    constructor(product : ProductEntity, productEnum : string, productType : string, isSmoker : string){
        this.product = product;
        this.productEnum = productEnum;
        this.productType = productType;
        this.isSmoker = isSmoker;
    }
}
