import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ClickThroughEntity } from 'src/app/models/click-through-entity';
import { CompanyEntity } from 'src/app/models/company-entity';
import { EndowmentEntity } from 'src/app/models/endowment-entity';
import { EndowmentProductEnum } from 'src/app/models/enums/endowment-product-enum.enum';
import { PolicyCurrencyEnum } from 'src/app/models/enums/policy-currency-enum.enum';
import { TermLifeProductEnum } from 'src/app/models/enums/term-life-product-enum.enum';
import { WholeLifeProductEnum } from 'src/app/models/enums/whole-life-product-enum.enum';
import { FeatureEntity } from 'src/app/models/feature-entity';
import { ProductEntity } from 'src/app/models/product-entity';
import { RiderEntity } from 'src/app/models/rider-entity';
import { TermLifeProductEntity } from 'src/app/models/term-life-product-entity';
import { WholeLifeProductEntity } from 'src/app/models/whole-life-product-entity';
import { CompanyService } from 'src/app/services/company.service';
import { ProductService } from 'src/app/services/product.service';
import { SessionService } from 'src/app/services/session.service';
import { HeaderComponent } from '../../header/header/header.component';
import { FooterComponent } from '../../footer/footer/footer.component';
import { PremiumEntity } from 'src/app/models/premium-entity';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [MessageService]
})
export class CreateProductComponent implements OnInit {
  product: ProductEntity;
  submitted: boolean = true;
  message: string | undefined;
  wholeLifeEnum: WholeLifeProductEnum | undefined;
  termLifeEnum: TermLifeProductEnum | undefined;
  endowmentEnum: EndowmentProductEnum | undefined;
  policyCurrency: string[] | undefined;
  productType: string;
  isTermLife: boolean = false;
  isWholeLife: boolean = false;
  isEndowment: boolean = false;
  isSmoker: boolean = false;
  assuredSumTouched: boolean = false;
  averageInterestTouched: boolean = false;
  canContinue: boolean = true;


  constructor(private sessionService: SessionService,
    private productService: ProductService,
    private buttonModule: ButtonModule,
    private inputTextModule: InputTextModule,
    private browserAnimationsModule: BrowserAnimationsModule,
    private companyService: CompanyService,
    private router: Router,
    private messageService: MessageService) {
    this.product = new ProductEntity(new Array(), new Array(), new Array(), new Array(), -1, -1, -1, -1);
    if (this.sessionService.getIsLogin() == true) {
      this.product.company = this.sessionService.getCompany();
    } else {
      this.router.navigate(["/index"]);
    }

    this.product.productId = null;
    this.product.productImage = null;
    this.product.productDateCreated = new Date();
    this.product.listOfAdditionalFeatures = new Array();
    this.product.listOfRiders = new Array();
    this.product.listOfPremium = new Array();
    this.product.listOfSmokerPremium = new Array();
    this.product.productCategoryPricing = null;
    this.product.clickThroughInfo = new ClickThroughEntity();
    this.product.productCategoryPricing = null;
    this.productType = "";

  }

  ngOnInit(): void {
  }

  checkCreditOwned(): boolean {
    return this.sessionService.checkCreditOwned();
  }

  redirectToTopUpCredit() {
    this.router.navigate(['makePayment']);
  }

  createProduct(createProductForm: NgForm): void {
    console.log((this.product.assuredSum));
    this.canContinue = true;

    if (this.product.productName === undefined || this.product.productName == "") {
      this.messageService.add({ severity: 'error', summary: "Product Name Cannot Be Empty!" });
      return;

    } else if (this.product.description === undefined || this.product.description == "") {
      this.messageService.add({ severity: 'error', summary: "Product Description Cannot Be Empty!" });
      return;

    } else if (this.product.coverageTerm <= 0 || this.product.coverageTerm > 200) {
      this.messageService.add({ severity: 'error', summary: "Product Coverage Term Is not valid!" });
      return;

    } else if (this.product.assuredSum < 0 || (this.assuredSumTouched == true && this.product.assuredSum == null)) {
      this.messageService.add({ severity: 'error', summary: "Product Assured Sum is not valid!" });
      return;

    } else if (this.product.premiumTerm <= 0) {
      this.messageService.add({ severity: 'error', summary: "Product Premium Term is not valid!" });
      return;

    } else if (this.product.averageInterestRate < 0 || this.product.averageInterestRate == null) {
      this.messageService.add({ severity: 'error', summary: "Average Interest Rate is not valid!" });
      return;

    } else if (this.product.policyCurrency === undefined) {
      this.messageService.add({ severity: 'error', summary: "Policy Currency Rate is needed!" });
      return;

    } else if (this.product.isAvailableToSmoker === undefined) {
      this.messageService.add({ severity: 'error', summary: "Indicate if it is available to smoker!" });
      return;

    } else if (this.productType == "") {
      this.messageService.add({ severity: 'error', summary: "Product Category has to be selected!" });
      return;

    } else if (this.termLifeEnum === undefined && this.endowmentEnum === undefined && this.wholeLifeEnum === undefined) {
      this.messageService.add({ severity: 'error', summary: "Type of Product has to be selected!" });
      return;
    } else if (this.product.listOfPremium.length <= 0) {
      this.messageService.add({ severity: 'error', summary: "Please enter product premium" });
      return;
    } else if (this.product.listOfPremium.length > 0) {
      this.product.listOfPremium.forEach(premium => this.checkThroughPremium(premium));
    }

    if (this.product.isAvailableToSmoker == true && this.product.listOfSmokerPremium.length <= 0) {
      this.messageService.add({ severity: 'error', summary: "Please enter smoker's premium" });
      return;

    } else if (this.product.isAvailableToSmoker == true && this.product.listOfSmokerPremium.length > 0) {
      this.product.listOfSmokerPremium.forEach(premium => this.checkThroughPremium(premium));
    }

    if (this.product.listOfAdditionalFeatures.length > 0) {
      this.product.listOfAdditionalFeatures.forEach(feature => this.checkThroughFeatures(feature));
    }

    if (this.product.listOfRiders.length > 0) {
      this.product.listOfRiders.forEach(rider => this.checkThroughRiders(rider));
    }


    if (this.canContinue == true && createProductForm.valid) {
      this.submitted = true;
      if (this.wholeLifeEnum != undefined) {
        let wholeLifeProd = new WholeLifeProductEntity(this.product.listOfAdditionalFeatures, this.product.listOfRiders, this.product.listOfPremium, this.product.listOfSmokerPremium, this.product.coverageTerm, this.product.assuredSum, this.product.premiumTerm, this.product.averageInterestRate, this.product.productName, this.product.description,
          this.product.policyCurrency, this.wholeLifeEnum, this.product.isAvailableToSmoker, this.product.clickThroughInfo, this.product.company);

        console.log(wholeLifeProd);
        if (this.product.isAvailableToSmoker == true) {
          this.isSmoker = true;
        } else {
          this.isSmoker = false;
        }

        this.productService.createProductForWholeLife(wholeLifeProd, this.isSmoker).subscribe(
          response => {
            let productId: number = response;
            this.message = "Whole life Product has been created successfully";
            this.messageService.add({ severity: 'success', summary: this.message });

            this.companyService.retrieveCompany().subscribe(
              responseInner => {
                let company: CompanyEntity = responseInner;
                this.sessionService.setCompany(company);
                this.clear();
              },
              error => {
                console.log("Error update company: " + error); //Just for referencing, company don't need to know

              }
            );
          },
          error => {
            this.message = "An error occured while creating the Whole Life Product ";
            console.log("The error: " + error);
            this.messageService.add({ severity: 'error', summary: this.message });
          }
        );

      } else if (this.termLifeEnum != undefined) {

        let termLifeProd = new TermLifeProductEntity(this.product.listOfAdditionalFeatures, this.product.listOfRiders, this.product.listOfPremium, this.product.listOfSmokerPremium, this.product.coverageTerm, this.product.assuredSum, this.product.premiumTerm, this.product.averageInterestRate, this.termLifeEnum, this.product.productName, this.product.description,
          this.product.policyCurrency, this.product.isAvailableToSmoker, this.product.clickThroughInfo, this.product.company);

        console.log(termLifeProd);

        if (this.product.isAvailableToSmoker == true) {
          this.isSmoker = true;
        } else {
          this.isSmoker = false;
        }

        this.productService.createProductForTermLife(termLifeProd, this.isSmoker).subscribe(
          response => {
            let productId: number = response;
            this.message = "Term Life Product has been created successfully";
            this.messageService.add({ severity: 'success', summary: this.message });

            this.companyService.retrieveCompany().subscribe(
              responseInner => {
                let company: CompanyEntity = responseInner;
                this.sessionService.setCompany(company);
                this.clear();
              },
              error => {
                console.log("Error update company: " + error); //Just for referencing, company don't need to know
              }
            );
          },
          error => {
            this.message = "An error occured while creating the Term Life Product ";
            console.log("The error: " + error);
            this.messageService.add({ severity: 'error', summary: this.message });
          }
        );

      } else if (this.endowmentEnum != undefined) {
        let endowmentProd = new EndowmentEntity(this.product.listOfAdditionalFeatures, this.product.listOfRiders, this.product.listOfPremium, this.product.listOfSmokerPremium, this.product.coverageTerm, this.product.assuredSum, this.product.premiumTerm, this.product.averageInterestRate, this.endowmentEnum,
          this.product.productName, this.product.description, this.product.policyCurrency, this.product.isAvailableToSmoker, this.product.clickThroughInfo, this.product.company);

        console.log(endowmentProd);

        if (this.product.isAvailableToSmoker == true) {
          this.isSmoker = true;
        } else {
          this.isSmoker = false;
        }

        this.productService.createProductForEndowment(endowmentProd, this.isSmoker).subscribe(
          response => {
            let productId: number = response;
            this.message = "Endowment Product has been created successfully";
            this.messageService.add({ severity: 'success', summary: this.message });


            this.companyService.retrieveCompany().subscribe(
              responseInner => {
                let company: CompanyEntity = responseInner;
                this.sessionService.setCompany(company);
                this.clear();
              },
              error => {
                console.log("Error update company: " + error); //Just for referencing, company don't need to know
              }
            );
          },
          error => {
            this.message = "An error occured while creating the Endowment Product ";
            console.log("The error: " + error);
            this.messageService.add({ severity: 'error', summary: this.message });
          }
        );


      } else {
        this.message = "An error occured while created product! Invalid product type!";
        this.messageService.add({ severity: 'error', summary: this.message });
      }

    } else {
      this.message = "An error occured while created product! Invalid product type!";
      this.messageService.add({ severity: 'error', summary: this.message });

    }
  }




  selectChangeHandlerSmoker(event: any) {
    //update the ui
    if (event.target.value == "true") {
      this.product.isAvailableToSmoker = true;
    } else {
      this.product.isAvailableToSmoker = false;
    }

    console.log("Smoker boolean: " + this.product.isAvailableToSmoker + " type: " + typeof (this.product.isAvailableToSmoker));
  }

  selectChangeHandlerCurrency(event: any) {
    //update the ui
    let stringText: string = event.target.value;
    let currency: PolicyCurrencyEnum = (<any>PolicyCurrencyEnum)[stringText];
    this.product.policyCurrency = currency;
    console.log("Currency: " + this.product.policyCurrency + " type: " + typeof (this.product.policyCurrency));
  }

  selectTermLifeEnum(event: any) {
    let stringText: string = event.target.value;
    let termLife: TermLifeProductEnum = (<any>TermLifeProductEnum)[stringText];
    this.termLifeEnum = termLife;
    console.log("TermLife: " + this.termLifeEnum + " type: " + typeof (this.termLifeEnum));
  }

  selectWholeLifeEnum(event: any) {
    let stringText: string = event.target.value;
    let wholeLife: WholeLifeProductEnum = (<any>WholeLifeProductEnum)[stringText];
    this.wholeLifeEnum = wholeLife;
    console.log("WholeLife: " + this.wholeLifeEnum + " type: " + typeof (this.wholeLifeEnum));
  }

  selectEndowmentEnum(event: any) {
    let stringText: string = event.target.value;
    let endowment: EndowmentProductEnum = (<any>EndowmentProductEnum)[stringText];
    this.endowmentEnum = endowment;
    console.log("Endowment: " + this.endowmentEnum + " type: " + typeof (this.endowmentEnum));
  }

  handleClickAddFeature(): void {
    this.product?.listOfAdditionalFeatures?.push(new FeatureEntity());
  }

  handleClickAddRider(): void {
    this.product?.listOfRiders?.push(new RiderEntity());
  }

  handleClickAddPremium(): void {
    this.product?.listOfPremium?.push(new PremiumEntity());
  }

  handleClickAddSmokerPremium(): void {
    this.product?.listOfSmokerPremium?.push(new PremiumEntity());
  }

  handleClickRemoveFeature(index: number): void {
    this.product?.listOfAdditionalFeatures?.splice(index, 1);
  }

  handleClickRemoveRider(index: number): void {
    this.product?.listOfRiders?.splice(index, 1);
  }

  handleClickRemovePremium(index: number): void {
    this.product?.listOfPremium?.splice(index, 1);
  }

  handleClickRemoveSmokerPremium(index: number): void {
    this.product?.listOfSmokerPremium?.splice(index, 1);
  }

  clear(): void {
    this.product = new ProductEntity(new Array(), new Array(), new Array(), new Array(), -1, -1, -1, -1);
    // this.router.navigate(["/product/createProduct"]);
    this.product.productId = null;
    this.product.productImage = null;
    this.product.productDateCreated = new Date();
    this.product.listOfAdditionalFeatures = new Array();
    this.product.listOfRiders = new Array();
    this.product.listOfPremium = new Array();
    this.product.listOfSmokerPremium = new Array();
    this.product.productCategoryPricing = null;
    this.product.clickThroughInfo = new ClickThroughEntity();
    this.product.productCategoryPricing = null;
    this.productType = "";
    this.isTermLife = false;
    this.isWholeLife = false;
    this.isEndowment = false;
    this.isSmoker = false;
    this.assuredSumTouched = false;
    this.averageInterestTouched = false;
    this.canContinue = true;
    this.submitted = false;
    this.wholeLifeEnum = undefined;
    this.termLifeEnum = undefined;
    this.endowmentEnum = undefined;
  }

  chooseEnum(event: any): void {
    if (event.target.value == "termlife") {
      this.isTermLife = true;
      this.isWholeLife = false;
      this.isEndowment = false;
      this.wholeLifeEnum = undefined;
      this.termLifeEnum = undefined;
      this.endowmentEnum = undefined;
    } else if (event.target.value == "wholelife") {
      this.isWholeLife = true;
      this.isTermLife = false;
      this.isEndowment = false;
      this.wholeLifeEnum = undefined;
      this.termLifeEnum = undefined;
      this.endowmentEnum = undefined;
    } else if (event.target.value == "endowment") {
      this.isEndowment = true;
      this.isTermLife = false;
      this.isWholeLife = false;
      this.wholeLifeEnum = undefined;
      this.termLifeEnum = undefined;
      this.endowmentEnum = undefined;

    }
  }

  checkAssuredTouch() {
    this.assuredSumTouched = true;
  }

  averageInterestTouch() {
    this.averageInterestTouched = true;
  }

  checkThroughFeatures(feature: FeatureEntity) {
    if (feature.featureName === undefined || feature.featureName === null) {
      this.messageService.add({ severity: 'error', summary: "Feature Name is required!" });
      this.canContinue = false;
      return;
    } else if (feature.featureDescription === undefined || feature.featureDescription === null) {
      this.messageService.add({ severity: 'error', summary: "Feature description is required!" });
      this.canContinue = false;
      return;
    }

  }


  checkThroughRiders(rider: RiderEntity) {
    if (rider.riderName === undefined || rider.riderName == null) {
      this.messageService.add({ severity: 'error', summary: "Rider Name is required!" });
      this.canContinue = false;
      return;
    } else if (rider.riderPremiumValue === undefined || rider.riderPremiumValue == null) {
      this.messageService.add({ severity: 'error', summary: "Rider Premium Value is required!" });
      this.canContinue = false;
      return;
    } else if (rider.riderPremiumValue < 0) {
      this.messageService.add({ severity: 'error', summary: "Rider Premium Value is invalid!" });
      this.canContinue = false;
      return;
    } else if (rider.riderDescription === undefined || rider.riderDescription == null) {
      this.messageService.add({ severity: 'error', summary: "Rider Description is required!" });
      this.canContinue = false;
      return;
    }

  }


  checkThroughPremium(premium: PremiumEntity): void {
    if (premium.minAgeGroup === undefined || premium.minAgeGroup == null) {
      this.messageService.add({ severity: 'error', summary: "Minimum age is required!" });
      this.canContinue = false;
      return;
    } else if (premium.minAgeGroup < 0) {
      this.messageService.add({ severity: 'error', summary: "Invalid minimum age!" });
      this.canContinue = false;
      return;
    } else if (premium.maxAgeGroup === undefined || premium.maxAgeGroup == null) {
      this.messageService.add({ severity: 'error', summary: "Maximum Age is required!" });
      this.canContinue = false;
      return;
    } else if (premium.maxAgeGroup < 0) {
      this.messageService.add({ severity: 'error', summary: "Invalid maximum age!" });
      this.canContinue = false;
      return;
    } else if (premium.premiumValue === undefined || premium.premiumValue == null) {
      this.messageService.add({ severity: 'error', summary: "Premium Value is needed!" });
      this.canContinue = false;
      return;
    } else if (premium.premiumValue < 0) {
      this.messageService.add({ severity: 'error', summary: "Invalid premium value!" });
      this.canContinue = false;
      return;
    }

  }

}
