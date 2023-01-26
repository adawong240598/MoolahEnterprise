import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MonthlyPaymentEntity } from 'src/app/models/monthly-payment-entity';
import { PaymentService } from 'src/app/services/payment.service';
import { CreditPaymentEntity } from 'src/app/models/credit-payment-entity';
import { DatePipe, formatDate } from '@angular/common';
import { PaymentEntity } from 'src/app/models/payment-entity';
import { PaymentWrapper } from 'src/app/models/payment-wrapper';
import { ProductLineItemEntity } from 'src/app/models/product-line-item-entity';
import { TabViewModule } from 'primeng/tabview';
@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css'],
  providers: [MessageService],
})
export class ViewTransactionComponent implements OnInit {

  listOfAllSpecificHistoricalTransaction: PaymentWrapper[] = new Array();
  listOfAllSpecificCreditHistoricalTransaction: PaymentWrapper[] = new Array();
  listOfAllSpecificMonthlyHistoricalTransaction: MonthlyPaymentEntity[] = new Array();
  listOfProductLineItem: ProductLineItemEntity[] = new Array();
  listOfCreditPmt: CreditPaymentEntity[] = new Array();
  startDateProductListing: Date = new Date();
  endDateProductListing: Date = new Date();
  startDateCreditPayment: Date = new Date();
  endDateCreditPayment: Date = new Date();
  selectedLineItem: number = 0;
  displayPopUp: boolean = false;
  sStartDate: string = "";
  sEndDate: string = "";


  constructor(private paymentService: PaymentService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {

    this.paymentService.retrieveAllSpecificHistoricalTransaction().subscribe(
      response => {
        this.listOfAllSpecificHistoricalTransaction = response;
        console.log(JSON.stringify(this.listOfAllSpecificHistoricalTransaction));
        // console.log("Retrieved successfully" + this.listOfAllSpecificHistoricalTransaction[0].paymentId);
        this.listOfAllSpecificHistoricalTransaction.forEach(history => {
        });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: "Something went wrong in retrieving your data due to:" + error, detail: 'Via MessageService' });
      }
    );

    this.paymentService.retrieveAllSpecificMonthlyCreditHistoricalTransaction().subscribe(
      response => {
        this.listOfAllSpecificCreditHistoricalTransaction = response;
        console.log(" credit pmt " + JSON.stringify(this.listOfAllSpecificCreditHistoricalTransaction));
      },
      error => {
        this.messageService.add({ severity: 'error', summary: "Something went wrong in retrieving your data due to: " + error, detail: 'Via MessageService' });
      }
    );

  }
  searchForTransactionProductListing() {
    var sDate = this.startDateProductListing.toString();
    var eDate = this.endDateProductListing.toString();
    console.log("sDate"+sDate);
    var sStartYear = sDate.substring(0, 4);
    var sStartMonth = sDate.substring(5, 7);
    var sStartDay = sDate.substring(8, 10);
    var eStartYear = eDate.substring(0, 4);
    var eStartMonth = eDate.substring(5, 7);
    var eStartDay = eDate.substring(8, 10);

    var dStartDate = new Date(sStartMonth + "/" + sStartDay + "/" + sStartYear);
    var dEndDate = new Date(eStartMonth + "/" + eStartDay + "/" + eStartYear);
    if (dStartDate > dEndDate) {
      this.messageService.add({ severity: 'error', summary: "You cannot choose a start date that is later than end date", detail: 'Via MessageService' });
    } else {

      this.listOfAllSpecificHistoricalTransaction = new Array();

      this.paymentService.retrieveSpecificHistoricalTransactions(this.startDateProductListing, this.endDateProductListing).subscribe(
        response => {

          this.listOfAllSpecificHistoricalTransaction = response;
          console.log(JSON.stringify(this.listOfAllSpecificCreditHistoricalTransaction));
        },
        error => {
          console.log("Error retrieving products : " + error);
        }
      );
    }

  }
  searchForTransactionCreditPayment() {
    var sDate = this.startDateCreditPayment.toString();
    var eDate = this.endDateCreditPayment.toString();
    var sStartYear = sDate.substring(0, 4);
    var sStartMonth = sDate.substring(5, 7);
    var sStartDay = sDate.substring(8, 10);
    var eStartYear = eDate.substring(0, 4);
    var eStartMonth = eDate.substring(5, 7);
    var eStartDay = eDate.substring(8, 10);

    var dStartDate = new Date(sStartMonth + "/" + sStartDay + "/" + sStartYear);
    var dEndDate = new Date(eStartMonth + "/" + eStartDay + "/" + eStartYear);
    if (dStartDate > dEndDate) {
      this.messageService.add({ severity: 'error', summary: "You cannot choose a start date that is later than end date", detail: 'Via MessageService' });
    } else {
      this.listOfAllSpecificCreditHistoricalTransaction = new Array();

      this.paymentService.retrieveAllSpecificCreditHistoricalTransaction(this.startDateCreditPayment, this.endDateCreditPayment).subscribe(
        response => {

          this.listOfAllSpecificCreditHistoricalTransaction = response;
          console.log(JSON.stringify(this.listOfAllSpecificCreditHistoricalTransaction));
        },
        error => {
          console.log("Error retrieving products : " + error);
        }
      );
    }

  }

  getDateString(dateToTransform: Date | null): string {
    if (dateToTransform != null) {
      var temp = dateToTransform.toString();
      var year = temp.substring(0, 4);
      var month = temp.substring(5, 7);
      var day = temp.substring(8, 10);
      var sDate = day + "-" + month + "-" + year;
      //console.log(sDate);
      return sDate;
    }
    return this.getDateString(new Date());
  }

  viewLineItems($event: any, rowIndex: number) {
    console.log("roleindex:" + rowIndex);
    var mp = this.listOfAllSpecificHistoricalTransaction[rowIndex].listOfProductLineItemEntity;
    mp.forEach(element => {
      this.listOfProductLineItem.push(element);
    });
    this.selectedLineItem = rowIndex;
    this.displayPopUp = true;
  }


  clearDialog($event: any) {
    this.selectedLineItem = 0;
    this.displayPopUp = false;
    this.listOfProductLineItem = new Array();
  }


}
