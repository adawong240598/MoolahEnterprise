import { SessionService } from 'src/app/services/session.service';
import { MonthlyPaymentEntity } from './../models/monthly-payment-entity';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from './..//footer/footer/footer.component';
import { HeaderComponent } from './..//header/header/header.component';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css'],
  providers: [MessageService]
})
export class MakePaymentComponent implements OnInit {

  selectedPaymentId: number = 0;
  selectedPayment: MonthlyPaymentEntity | null = null;

  creditCardNumber: string = "";
  creditCardName: string = "";
  creditCardExp: Date | null = null;
  creditCardCvv: string = "";
  creditToBuy: number = 0;
  costOfCredit: number = 0;

  next: boolean = false;
  back: boolean = true;
  success: boolean = false;

  constructor(private router: Router,
    private paymentService: PaymentService,
    private messageService: MessageService,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.paymentService.getCostOfCredit().subscribe(
      response => {
        this.costOfCredit = response;
      },
      error => {
        var message = "An error has occurred while retrieving your payment: " + error;
        this.messageService.add({ severity: 'error', summary: message, detail: 'Via MessageService' });
      });

  }

  purchaseMoolahCredit() {

    if (this.creditCardName.length <= 3) {
      this.messageService.add({ severity: 'error', summary: "Length of Credit Card Name must be greater than 3 characters", detail: 'Via MessageService' });
      return;
    } else if (this.creditCardNumber.length != 16) {
      this.messageService.add({ severity: 'error', summary: "Credit Card Number is invalid", detail: 'Via MessageService' });
      return;
    } else if (this.creditCardExp != null && this.creditCardExp <= new Date(Date.now())) {
      this.messageService.add({ severity: 'error', summary: "Credit Card has expired", detail: 'Via MessageService' });
      return;
    } else if (this.creditCardCvv.length != 3) {
      this.messageService.add({ severity: 'error', summary: "Credit Card CVV is invalid", detail: 'Via MessageService' });
      return;
    }

    if (isNaN(Number(this.creditCardNumber.toString()))) {
      this.messageService.add({ severity: 'error', summary: "Credit Card Number is invalid", detail: 'Via MessageService' });
      return;
    }
    if (isNaN(Number(this.creditCardCvv.toString()))) {
      this.messageService.add({ severity: 'error', summary: "Credit Card CVV is invalid", detail: 'Via MessageService' });
      return;
    }

    this.paymentService.purchaseMoolahCredit(this.creditToBuy).subscribe(
      response => {
        var id = response;
        this.messageService.add({ severity: 'success', summary: "Payment successful: " + id, detail: 'Via MessageService' });
        var company = this.sessionService.getCompany();
        company.creditOwned = company.creditOwned + this.creditToBuy;
        this.sessionService.setCompany(company);

        this.success = true;
      },
      error => {
        var message = "An error has occurred while processing your payment: " + error;
        this.messageService.add({ severity: 'error', summary: message, detail: 'Via MessageService' });
      });
  }

  goBack() {
    this.back = true;
    this.next = false;
  }

  goNext() {
    if (this.creditToBuy <= 0) {
      this.messageService.add({ severity: 'error', summary: "Amount of credits to purchase must be greater than 0", detail: 'Via MessageService' });
      return;
    }
    this.back = false;
    this.next = true;
  }

  getAmountPayable(): number {
    return this.creditToBuy * this.costOfCredit;
  }

  backToHome() {
    this.creditCardNumber = "";
    this.creditCardName = "";
    this.creditCardExp = null;
    this.creditCardCvv = "";
    this.creditToBuy = 0;
    this.costOfCredit = 0;
    this.router.navigate(["/index"]);
  }

  onCompleteCreditTopUp() {
    var balance = this.creditToBuy % 100;
    if (balance < 50) {
      this.creditToBuy = this.creditToBuy - balance;
    } else {
      this.creditToBuy = this.creditToBuy + (100 - balance);
    }
    console.log(this.creditToBuy);
  }
}
