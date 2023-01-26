import { ProductLineItemEntity } from './../models/product-line-item-entity';
import { MonthlyPaymentEntity } from './../models/monthly-payment-entity';
import { PaymentService } from './../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './../services/session.service';

import { NgForm } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PointOfContactEntity } from 'src/app/models/point-of-contact-entity';
import { CompanyEntity } from './..//models/company-entity';
import { FooterComponent } from './..//footer/footer/footer.component';
import { HeaderComponent } from './..//header/header/header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DatePipe, formatDate } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-view-current-payable',
  templateUrl: './view-current-payable.component.html',
  styleUrls: ['./view-current-payable.component.css'],
  providers: [ConfirmationService, MessageService, DatePipe]
})
export class ViewCurrentPayableComponent implements OnInit {
  company: CompanyEntity;
  monthlyPayments: MonthlyPaymentEntity[] = new Array();
  listOfProductItems: ProductLineItemEntity[] = new Array();
  display: boolean = false;
  severity: string = "info";
  selected: number = 0;


  constructor(private sessionService: SessionService,
    private paymentService: PaymentService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) {
    this.company = this.sessionService.getCompany();
  }


  ngOnInit(): void {
    this.retrieveAllUnpaidPayment();
    console.log(this.company.creditOwned);
  }

  retrieveAllUnpaidPayment() {
    console.log("retrieveAllUnpaidPayment")
    this.paymentService.retrieveAllUnpaidMonthlyPayment().subscribe(
      response => {
        this.monthlyPayments = response;
      },
      error => {
        var message = "An error has occurred while retrieving your payment history: " + error;
        this.messageService.add({ severity: 'error', summary: message, detail: 'Via MessageService' });

      }
    );
  }

  viewLineItems($event: any, rowIndex: number) {

    var mp = this.monthlyPayments[rowIndex].listOfProductLineItems;
    mp.forEach(element => {
      this.listOfProductItems.push(element);
    });
    this.selected = rowIndex;
    this.display = true;
  }

  clearDialog($event: any) {
    this.selected = 0;
    this.display = false;
    this.listOfProductItems = new Array();
  }

  getString(paid: boolean) {
    if (paid) {
      this.severity = "success";
      return "Paid";
    } else {
      this.severity = "danger";
      return "Unpaid";
    }
  }

  checkForPaid(): boolean {
    if (this.monthlyPayments !== undefined && this.monthlyPayments[this.selected] != undefined) {
      if (this.monthlyPayments[this.selected].paid != undefined) {
        if (this.monthlyPayments[this.selected].paid == true) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  payNow() {
    var balance = this.company.creditOwned - Number(this.monthlyPayments[this.selected].totalPayable);
    this.confirmationService.confirm({
      message: 'Do you wish to pay now?' + '\n' + 'You will be left with ' + balance + ' credit',
      accept: () => {
        this.company.creditOwned = balance;
        this.sessionService.setCompany(this.company);
        this.monthlyPayments[this.selected].paid = true;
        this.messageService.add({ severity: 'success', summary: "Payment is successful! You are left with " + balance + " credit", detail: 'Via MessageService' });
        this.paymentService.makePayment(this.monthlyPayments[this.selected].paymentId).subscribe(
          response => { },
          error => {
            var message = "An error has occurred while processing your payment: " + error;
            this.messageService.add({ severity: 'error', summary: message, detail: 'Via MessageService' });
          }
        );
        this.display = false;
        this.listOfProductItems = new Array();

      }
    });

  }

  redirectToTopUp() {
    this.router.navigate(["makePayment"]);
  }

  getDateString(dateToTransform: Date | null): string {
    if (dateToTransform != null) {
      var temp = dateToTransform.toString();
      temp = temp.substring(0, 8);
      var tempDate = new Date(temp);
      console.log(tempDate);
      return formatDate(tempDate, "mediumDate", "en-US");
    }
    return formatDate(Date.now(), "mediumDate", "en-US");
  }

  getTotalPayable(total: number | undefined): number {
    if (total !== undefined) {
      return Number(total);
    } else {
      return 0;
    }
  }

  getDateGeneratedString(): string {
    let monthlyPaymentEntity: MonthlyPaymentEntity = this.monthlyPayments[this.selected];
    if (monthlyPaymentEntity !== undefined) {
      var dateGenerated = monthlyPaymentEntity.dateGenerated;
    } else {
      dateGenerated = null;
    }
    if (dateGenerated === null || dateGenerated === undefined) {
      return "";
    } else {
      return this.getDateString(monthlyPaymentEntity.dateGenerated);
    }
  }

  getTotalPayableString(): number {
    let monthlyPaymentEntity: MonthlyPaymentEntity = this.monthlyPayments[this.selected];
    if (monthlyPaymentEntity !== undefined) {
      var total = monthlyPaymentEntity.totalPayable;
    } else {
      total = undefined;
    }

    if (total === null || total === undefined) {
      return 0;
    } else {
      return total;
    }
  }
}
