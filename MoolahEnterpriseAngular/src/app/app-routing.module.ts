import { MakePaymentComponent } from './make-payment/make-payment.component';
import { ViewCurrentPayableComponent } from './view-current-payable/view-current-payable.component';
import { ViewMyCompanyDetailsComponent } from './company/view-my-company-details/view-my-company-details.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { IndexComponent } from './index/index/index.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ViewProductDetailsComponent } from './product/view-product-details/view-product-details.component';
import { AboutUsComponent } from './aboutus/about-us/about-us.component';
import { ViewAllProductsComponent } from './product/view-all-products/view-all-products.component';
import { ForgetPasswordComponent } from './password/forget-password/forget-password.component';
import { KeyNewPasswordComponent } from './password/key-new-password/key-new-password.component';
import { ViewTransactionComponent } from './transaction/view-transaction/view-transaction.component';
import { DeactivateAccountComponent } from './deactivate/deactivate-account/deactivate-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'company/createCompany', component: CreateCompanyComponent },
  { path: 'company/viewMyCompanyDetails', component: ViewMyCompanyDetailsComponent },
  { path: 'product/createProduct', component: CreateProductComponent },
  { path: 'viewCurrentPayable', component: ViewCurrentPayableComponent},
  { path: 'makePayment', component: MakePaymentComponent},
  { path: 'product/viewProductDetails', component: ViewProductDetailsComponent },
  { path: 'product/viewProductDetails/:productId', component: ViewProductDetailsComponent },
  { path: 'aboutus/aboutUs', component: AboutUsComponent },
  { path: 'product/viewAllProducts', component: ViewAllProductsComponent},
  { path: 'password/forgetPassword', component: ForgetPasswordComponent},
  { path: 'password/keyNewPassword', component: KeyNewPasswordComponent},
  { path: 'viewCurrentPayable', component: ViewCurrentPayableComponent },
  { path: 'viewCurrentPayable', component: ViewCurrentPayableComponent },
  { path: 'transaction/view', component: ViewTransactionComponent },
  { path: 'deactivate/deactivateAccount', component: DeactivateAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
