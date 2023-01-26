import { KeyFilterModule } from 'primeng/keyfilter';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';


import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';

import { IndexComponent } from './index/index/index.component';
import { MenubarModule } from 'primeng/menubar';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewMyCompanyDetailsComponent } from './company/view-my-company-details/view-my-company-details.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { AccessRightErrorComponent } from './access-right-error/access-right-error/access-right-error.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ViewProductDetailsComponent } from './product/view-product-details/view-product-details.component';
import { ViewCurrentPayableComponent } from './view-current-payable/view-current-payable.component';
import { ViewAllProductsComponent } from './product/view-all-products/view-all-products.component';
import { ForgetPasswordComponent } from './password/forget-password/forget-password.component';
import { KeyNewPasswordComponent } from './password/key-new-password/key-new-password.component';
import { BadgeModule } from 'primeng/badge';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { CalendarModule } from 'primeng/calendar';
import { AboutUsComponent } from './aboutus/about-us/about-us.component';
import {CheckboxModule} from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ViewTransactionComponent } from './transaction/view-transaction/view-transaction.component';
import {TabViewModule} from 'primeng/tabview';


import {DropdownModule} from 'primeng/dropdown';
import { DatePipe } from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import { DeactivateAccountComponent } from './deactivate/deactivate-account/deactivate-account.component';
import { BodyComponent } from './body/body/body.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateCompanyComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    ViewMyCompanyDetailsComponent,
    CreateProductComponent,
    AccessRightErrorComponent,
    ViewProductDetailsComponent,
    ViewCurrentPayableComponent,
    ViewAllProductsComponent,
    ForgetPasswordComponent,
    KeyNewPasswordComponent,
    MakePaymentComponent,
    AboutUsComponent,
    ViewTransactionComponent,
    DeactivateAccountComponent,
    BodyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToastModule,
    FileUploadModule,
    ConfirmDialogModule,
    DialogModule,
    SplitButtonModule,
    BadgeModule,
    CalendarModule,
    CalendarModule,
    CheckboxModule,
    InputNumberModule,
    KeyFilterModule,
    MessageModule,
    MessagesModule,
    TabViewModule,
    DropdownModule,
    AvatarGroupModule,
    AvatarModule,
    OverlayPanelModule,
    MenuModule
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
