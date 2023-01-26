import { PaymentEntity } from "./payment-entity";
import { PointOfContactEntity } from "./point-of-contact-entity";
import { ProductEntity } from "./product-entity";
import { RefundEntity } from "./refund-entity";

export class CompanyEntity {
    companyID: number | undefined;
    profilePic: Uint8Array | undefined | null;
    companyName: string = "";
    companyEmail: string = "";
    businessRegNumber: string = "";
    companyContactNumber: string = "";
    warningMessage: string = "";
    isVerified: boolean | undefined;
    password: string = "";
    verificationDate: Date | undefined;
    creditOwned: number = 0;
    isDeactivated: boolean = false;
    isDeleted: boolean = false;
    isWarned: boolean = false;
    refund: RefundEntity | undefined;
    listOfPointOfContacts: PointOfContactEntity[];
    listOfPayments: PaymentEntity[] | undefined;
    listOfProducts: ProductEntity[] | undefined;
    resetPasswordPathParam: string | undefined | null;
    companyImage: string | undefined    = "";
    companyUrl: string | undefined;
    expiryDateOfPathParam: Date | undefined | null;

    constructor(companyID?: number, profilePic?: Uint8Array, companyName?: string, companyEmail?: string, businessRegNumber?: string,
        companyContactNumber?: string, warningMessage?: string, isVerified?: boolean, password?: string, verificationDate?: Date,
        creditOwned?: number, isDeactivated?: boolean, isDeleted?: boolean, isWarned?: boolean, refund?: RefundEntity,
        listOfPointOfContacts?: PointOfContactEntity[], listOfPayments?: PaymentEntity[], listOfProducts?: ProductEntity[],
        companyImage?: string, companyUrl?: string, expiryDateOfPathParam?: Date) {

        this.companyID = companyID;
        this.profilePic = profilePic;
        this.refund = refund;
        this.listOfPointOfContacts = new Array();
        this.listOfPayments = listOfPayments;
        this.listOfProducts = listOfProducts;
        this.companyImage = companyImage;
        this.companyUrl = companyUrl;
        this.expiryDateOfPathParam = expiryDateOfPathParam;
    }
}
