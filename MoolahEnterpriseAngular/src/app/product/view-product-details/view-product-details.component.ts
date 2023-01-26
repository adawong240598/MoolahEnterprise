import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductEntity } from 'src/app/models/product-entity';
import { SessionService } from 'src/app/services/session.service';
import { ProductService } from 'src/app/services/product.service';
import { CompanyService } from 'src/app/services/company.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PolicyCurrencyEnum } from 'src/app/models/enums/policy-currency-enum.enum';
import { EndowmentEntity } from 'src/app/models/endowment-entity';
import { WholeLifeProductEntity } from 'src/app/models/whole-life-product-entity';
import { TermLifeProductEntity } from 'src/app/models/term-life-product-entity';
import { ProductEntityWrapper } from 'src/app/models/product-entity-wrapper';
import { CompanyEntity } from 'src/app/models/company-entity';
import { EndowmentProductEnum } from 'src/app/models/enums/endowment-product-enum.enum';
import { WholeLifeProductEnum } from 'src/app/models/enums/whole-life-product-enum.enum';
import { TermLifeProductEnum } from 'src/app/models/enums/term-life-product-enum.enum';
import { PremiumEntity } from 'src/app/models/premium-entity';
import { RiderEntity } from 'src/app/models/rider-entity';
import { FeatureEntity } from 'src/app/models/feature-entity';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ViewProductDetailsComponent implements OnInit {
  submitted: boolean = true;
  message: string | undefined;

  productId: string;
  productToView: ProductEntity;
  productEnumType: string;
  productType: string;
  retrieveProductError: boolean;
  isDeleted: boolean = false;
  isSmoker: boolean = false;
  assuredSumTouched: boolean = false;
  averageInterestTouched: boolean = false;
  canContinue: boolean = true;


  toggleProductName: boolean = true;
  toggleProductDescription: boolean = true;
  toggleCoverageTerm: boolean = true;
  toggleAssuredSum: boolean = true;
  togglePremiumTerm: boolean = true;
  toggleAverageInterestRate: boolean = true;
  togglePolicyCurrency: boolean = true;
  toggleIsAvailableToSmoker: boolean = true;
  toggleAdditionalFeatures: boolean = true;
  toggleRider: boolean = true;
  togglePremium: boolean = true;
  toggleSmokerPremium: boolean = true;



  constructor(private sessionService: SessionService,
    private productService: ProductService,
    private buttonModule: ButtonModule,
    private inputTextModule: InputTextModule,
    private browserAnimationsModule: BrowserAnimationsModule,
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    if (sessionService.getIsLogin() == false) {
      this.router.navigate(["/index"]);
    }
    this.productId = "";
    this.productToView = new ProductEntity(new Array(), new Array(), new Array(), new Array(), 0, 0, 0, 0);


    this.retrieveProductError = false;
    this.productEnumType = "";
    this.productType = "";

  }

  ngOnInit(): void {

    let prodIdTemp: string | null = this.activatedRoute.snapshot.paramMap.get('productId');
    if (prodIdTemp == null) {
      this.router.navigate(["/index"])
    } else {
      this.productId = prodIdTemp;
      if (this.productId != null) {
        this.productService.retrieveSpecificProductWrapper(parseInt(this.productId)).subscribe(
          response => {
            let productWrapper: ProductEntityWrapper = response;
            this.productToView = productWrapper.product;
            console.log(JSON.stringify(productWrapper));
            this.productEnumType = productWrapper.productEnum;
            this.productType = productWrapper.productType;
            if (productWrapper.isSmoker == "true") {
              this.productToView.isAvailableToSmoker = true;
            } else {
              this.productToView.isAvailableToSmoker = false;
            }
          },
          error => {
            this.retrieveProductError = true;
            console.log("Error for Product Details: " + error);
          }
        );
      }
    }

  }

  deleteProduct() {
    this.productService.deleteProduct(parseInt(this.productId)).subscribe(
      response => {
        this.isDeleted = true;
        this.message = "Product has been successfully deleted!";
        this.messageService.add({ severity: 'success', summary: this.message });
      },
      error => {
        this.message = "Error deleting product! Err: " + error;
        this.messageService.add({ severity: 'error', summary: this.message });
      }
    );
  }

  backToHome() {
    this.router.navigate(["/product/viewAllProducts"]);
  }


  updateProduct(updateProductForm: NgForm) {

    this.canContinue = true;

    if (this.productToView.productName === undefined || this.productToView.productName == "") {
      this.messageService.add({ severity: 'error', summary: "Product Name Cannot Be Empty!" });
      return;

    } else if (this.productToView.description === undefined || this.productToView.description == "") {
      this.messageService.add({ severity: 'error', summary: "Product Description Cannot Be Empty!" });
      return;

    } else if (this.productToView.coverageTerm <= 0 || this.productToView.coverageTerm > 200) {
      this.messageService.add({ severity: 'error', summary: "Product Coverage Term Is not valid!" });
      return;

    } else if (this.productToView.assuredSum < 0 || (this.assuredSumTouched == true && this.productToView.assuredSum == null)) {
      this.messageService.add({ severity: 'error', summary: "Product Assured Sum is not valid!" });
      return;

    } else if (this.productToView.premiumTerm <= 0) {
      this.messageService.add({ severity: 'error', summary: "Product Premium Term is not valid!" });
      return;

    } else if (this.productToView.averageInterestRate < 0 || this.productToView.averageInterestRate == null) {
      this.messageService.add({ severity: 'error', summary: "Average Interest Rate is not valid!" });
      return;

    } else if (this.productToView.policyCurrency === undefined) {
      this.messageService.add({ severity: 'error', summary: "Policy Currency Rate is needed!" });
      return;

    } else if (this.productToView.isAvailableToSmoker === undefined) {
      this.messageService.add({ severity: 'error', summary: "Indicate if it is available to smoker!" });
      return;

    } else if (this.productToView.listOfPremium.length <= 0) {
      this.messageService.add({ severity: 'error', summary: "Please enter product premium" });
      return;
    } else if (this.productToView.listOfPremium.length > 0) {
      this.productToView.listOfPremium.forEach(premium => this.checkThroughPremium(premium));
    }

    if (this.productToView.isAvailableToSmoker == true && this.productToView.listOfSmokerPremium.length <= 0) {
      this.messageService.add({ severity: 'error', summary: "Please enter smoker's premium" });
      return;

    } else if (this.productToView.isAvailableToSmoker == true && this.productToView.listOfSmokerPremium.length > 0) {
      this.productToView.listOfSmokerPremium.forEach(premium => this.checkThroughPremium(premium));
    }

    if (this.productToView.listOfAdditionalFeatures.length > 0) {
      this.productToView.listOfAdditionalFeatures.forEach(feature => this.checkThroughFeatures(feature));
    }

    if (this.productToView.listOfRiders.length > 0) {
      this.productToView.listOfRiders.forEach(rider => this.checkThroughRiders(rider));
    }


    if (this.canContinue == true && updateProductForm.valid) {

      if (this.productType == "ENDOWMENT") {
        let endowmentProd: EndowmentEntity = new EndowmentEntity(new Array(), new Array(), new Array(), new Array(), 0, 0, 0, 0);
        if (this.productToView.isAvailableToSmoker == true) {
          console.log("YES smoker");
          this.isSmoker = true;
          endowmentProd = new EndowmentEntity(this.productToView.listOfAdditionalFeatures, this.productToView.listOfRiders, this.productToView.listOfPremium, this.productToView.listOfSmokerPremium, this.productToView.coverageTerm, this.productToView.assuredSum,
            this.productToView.premiumTerm, this.productToView.averageInterestRate, (<any>EndowmentProductEnum)[this.productEnumType], this.productToView.productName, this.productToView.description, this.productToView.policyCurrency, this.productToView.isAvailableToSmoker,
            this.productToView.clickThroughInfo, this.productToView.company);
          endowmentProd.productId = this.productToView.productId;
        } else {
          console.log("NO smoker");
          this.isSmoker = false;
          endowmentProd = new EndowmentEntity(this.productToView.listOfAdditionalFeatures, this.productToView.listOfRiders, this.productToView.listOfPremium, new Array(), this.productToView.coverageTerm, this.productToView.assuredSum,
            this.productToView.premiumTerm, this.productToView.averageInterestRate, (<any>EndowmentProductEnum)[this.productEnumType], this.productToView.productName, this.productToView.description, this.productToView.policyCurrency, this.productToView.isAvailableToSmoker,
            this.productToView.clickThroughInfo, this.productToView.company);
          endowmentProd.productId = this.productToView.productId;
        }

        this.productService.updateEndowmentProduct(endowmentProd, this.isSmoker).subscribe(
          response => {
            this.message = "Product has been successfully updated! Product: " + this.productToView.productName;
            this.messageService.add({ severity: 'success', summary: this.message });

            this.companyService.retrieveCompany().subscribe(
              responseInner => {
                let company: CompanyEntity = responseInner;
                this.sessionService.setCompany(company);
              },
              error => {
                console.log("Error update company: " + error); //Just for referencing, company don't need to know
              }
            );
          },
          error => {
            this.message = "An error has occurred while updating your product! ";
            console.log("The error: " + error);
            this.messageService.add({ severity: 'error', summary: this.message });

          }
        )
      } else if (this.productType == "WHOLELIFEPRODUCT") {
        let wholeLifeProd: WholeLifeProductEntity = new WholeLifeProductEntity(new Array(), new Array(), new Array(), new Array(), 0, 0, 0, 0);
        if (this.productToView.isAvailableToSmoker == true) {
          console.log("YES smoker");
          this.isSmoker = true;
          wholeLifeProd = new WholeLifeProductEntity(this.productToView.listOfAdditionalFeatures, this.productToView.listOfRiders, this.productToView.listOfPremium, this.productToView.listOfSmokerPremium, this.productToView.coverageTerm, this.productToView.assuredSum,
            this.productToView.premiumTerm, this.productToView.averageInterestRate, this.productToView.productName, this.productToView.description, this.productToView.policyCurrency, (<any>WholeLifeProductEnum)[this.productEnumType], this.productToView.isAvailableToSmoker,
            this.productToView.clickThroughInfo, this.productToView.company);
          wholeLifeProd.productId = this.productToView.productId;
        } else {
          console.log("NO smoker");
          this.isSmoker = false;
          wholeLifeProd = new WholeLifeProductEntity(this.productToView.listOfAdditionalFeatures, this.productToView.listOfRiders, this.productToView.listOfPremium, new Array(), this.productToView.coverageTerm, this.productToView.assuredSum,
            this.productToView.premiumTerm, this.productToView.averageInterestRate, this.productToView.productName, this.productToView.description, this.productToView.policyCurrency, (<any>WholeLifeProductEnum)[this.productEnumType], this.productToView.isAvailableToSmoker,
            this.productToView.clickThroughInfo, this.productToView.company);
          wholeLifeProd.productId = this.productToView.productId;
        }
        console.log("Whole life entry before subscribe");
        this.productService.updateWholeLifeProduct(wholeLifeProd, this.isSmoker).subscribe(
          response => {
            console.log(JSON.stringify(wholeLifeProd));
            console.log("Whole life entry successful");
            this.message = "Product has been successfully updated! Product: " + this.productToView.productName;
            this.messageService.add({ severity: 'success', summary: this.message });

            this.companyService.retrieveCompany().subscribe(
              responseInner => {
                let company: CompanyEntity = responseInner;
                this.sessionService.setCompany(company);
              },
              error => {
                console.log("Error update company: " + error);
              }
            );
          },
          error => {
            this.message = "An error has occurred while updating your product! ";
            console.log("The error: " + error);
            this.messageService.add({ severity: 'error', summary: this.message });

          }
        )

      } else if (this.productType == "TERMLIFEPRODUCT") {
        let termLifeProd: TermLifeProductEntity = new TermLifeProductEntity(new Array(), new Array(), new Array(), new Array(), 0, 0, 0, 0);
        if (this.productToView.isAvailableToSmoker == true) {
          console.log("YES smoker");
          this.isSmoker = true;
          termLifeProd = new TermLifeProductEntity(this.productToView.listOfAdditionalFeatures, this.productToView.listOfRiders, this.productToView.listOfPremium, this.productToView.listOfSmokerPremium, this.productToView.coverageTerm, this.productToView.assuredSum,
            this.productToView.premiumTerm, this.productToView.averageInterestRate, (<any>TermLifeProductEnum)[this.productEnumType], this.productToView.productName, this.productToView.description, this.productToView.policyCurrency, this.productToView.isAvailableToSmoker,
            this.productToView.clickThroughInfo, this.productToView.company);
          termLifeProd.productId = this.productToView.productId;
        } else {
          console.log("NO smoker");
          this.isSmoker = false;
          termLifeProd = new TermLifeProductEntity(this.productToView.listOfAdditionalFeatures, this.productToView.listOfRiders, this.productToView.listOfPremium, new Array(), this.productToView.coverageTerm, this.productToView.assuredSum,
            this.productToView.premiumTerm, this.productToView.averageInterestRate, (<any>TermLifeProductEnum)[this.productEnumType], this.productToView.productName, this.productToView.description, this.productToView.policyCurrency, this.productToView.isAvailableToSmoker,
            this.productToView.clickThroughInfo, this.productToView.company);
          termLifeProd.productId = this.productToView.productId;
        }


        this.productService.updateTermLifeProduct(termLifeProd, this.isSmoker).subscribe(
          response => {
            this.message = "Product has been successfully updated! Product: " + this.productToView.productName;
            this.messageService.add({ severity: 'success', summary: this.message });

            this.companyService.retrieveCompany().subscribe(
              responseInner => {
                let company: CompanyEntity = responseInner;
                this.sessionService.setCompany(company);
              },
              error => {
                console.log("Error update company: " + error); //Just for referencing, company don't need to know
              }
            );
          },
          error => {
            this.message = "An error has occurred while updating your product! ";
            console.log("The error: " + error);
            this.messageService.add({ severity: 'error', summary: this.message });

          });
      } else {
        this.message = "An error occured while update product! Invalid Form submission!";
        this.messageService.add({ severity: 'error', summary: this.message });
      }


    } else {
      this.message = "An error occured while update product! Invalid Form submission!";
      this.messageService.add({ severity: 'error', summary: this.message });
    }
  }

  saveProductName() {
    this.toggleProductName = false;
  }

  saveProductDescription() {
    this.toggleProductDescription = false;
  }

  saveCoverageTerm() {
    this.toggleCoverageTerm = false;
  }

  saveAssuredSum() {
    this.toggleAssuredSum = false;
  }

  savePremiumTerm() {
    this.togglePremiumTerm = false;
  }

  saveAverageInterestRate() {
    this.toggleAverageInterestRate = false;
  }

  savePolicyCurrency() {
    this.togglePolicyCurrency = false;
  }

  saveIsAvailableToSmoker() {
    this.toggleIsAvailableToSmoker = false;
  }

  saveAdditionalFeatures() {
    this.toggleAdditionalFeatures = false;
  }

  saveRider() {
    this.toggleRider = false;
  }

  savePremium() {
    this.togglePremium = false;
  }

  saveSmokerPremium() {
    this.toggleSmokerPremium = false;
  }


  selectChangeHandlerCurrency(event: any) {
    //update the ui
    let stringText: string = event.target.value;
    let currency: PolicyCurrencyEnum = (<any>PolicyCurrencyEnum)[stringText];
    this.productToView.policyCurrency = currency;
    console.log("Currency: " + this.productToView.policyCurrency + " type: " + typeof (this.productToView.policyCurrency));
  }

  selectChangeHandlerSmoker(event: any) {
    //update the ui
    console.log("Event: " + event.target.value);
    if (event.target.value == "0") {
      this.productToView.isAvailableToSmoker = true;
    } else {
      this.productToView.isAvailableToSmoker = false;
    }

    console.log("Smoker boolean: " + this.productToView.isAvailableToSmoker + " type: " + typeof (this.productToView.isAvailableToSmoker));
  }

  handleClickAddFeature(): void {
    this.productToView?.listOfAdditionalFeatures?.push(new FeatureEntity());
  }

  handleClickAddRider(): void {
    this.productToView?.listOfRiders?.push(new RiderEntity());
  }

  handleClickAddPremium(): void {
    this.productToView?.listOfPremium?.push(new PremiumEntity());
  }

  handleClickAddSmokerPremium(): void {
    this.productToView?.listOfSmokerPremium?.push(new PremiumEntity());
  }

  handleClickRemoveFeature(index: number): void {
    this.productToView?.listOfAdditionalFeatures?.splice(index, 1);
  }

  handleClickRemoveRider(index: number): void {
    this.productToView?.listOfRiders?.splice(index, 1);
  }

  handleClickRemovePremium(index: number): void {
    this.productToView?.listOfPremium?.splice(index, 1);
  }

  handleClickRemoveSmokerPremium(index: number): void {
    this.productToView?.listOfSmokerPremium?.splice(index, 1);
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


    confirmDeleteProduct() {
      this.confirmationService.confirm({
        message: 'Are you sure you wish to delete this product: ' + this.productToView.productName,
        accept: () => {
          this.deleteProduct();
        }
      });
    }
}
