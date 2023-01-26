import { Component, OnInit, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ProductEntity } from '../../models/product-entity';
import { ProductService } from '../../services/product.service';
import { FilterService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { DatePipe, formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css'],
  providers: [MessageService],
})
export class ViewAllProductsComponent implements OnInit {

  productsFixed: ProductEntity[];

  products: ProductEntity[];

  totalRecords: number = 0;

  loading: boolean = true;

  categoryTypes: any[];

  startFilterDate: string = "";

  endFilterDate: string = "";

  selectedProductName: string = "";

  selectedEnumCategory: string = "";


  constructor(private productService: ProductService, private filterService: FilterService, private datepipe: DatePipe, private messageService: MessageService) {
    this.productsFixed = new Array();
    this.products = new Array();
    this.categoryTypes = new Array();
  }

  ngOnInit(): void {
    this.productService.retrieveCompanyProducts().subscribe(
      response => {
        
        this.productsFixed =response;
        this.products = response;
        this.loading = false;
         //   console.log("Retrieved successfully" + JSON.stringify(this.products));
                                                                                                        
      },
      error => {
        console.log("Error retrieving products : " + error);
      }
    );

    this.totalRecords = this.products.length;

    this.categoryTypes = [
      { label: "ENDOWMENT", value: "ENDOWMENT" },
      { label: "TERMLIFE", value: "TERMLIFE" },
      { label: "WHOLELIFE", value: "WHOLELIFE" }
    ];

 

  }

  applyFilterGlobal($event: any, stringVal: string, dt: any) {
    console.log("It has been entered Filter successfully!!!");
    dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
    console.log("It has been filterd successfully!!!");

  }


  getDateString(dateToTransform: Date): Date {
    var temp = dateToTransform.toString();
    temp = temp.substring(0, 10);
    var tempDate = new Date(temp);
    // console.log(tempDate);
    return this.getDate(formatDate(tempDate, "mediumDate", "en-US"));

  }


  getDate(dateToTransform: string): Date {
    var temp = dateToTransform.toString();
    temp = temp.substring(0, 10);
    //  console.log("String date: " + temp);
    let tempDate: Date = new Date(temp);
    return tempDate;
  }


  searchForFilteredProducts(event: any) {
    console.log("End Filter date :" + this.endFilterDate+"|");
    console.log("Entered into searchForFilteredProducts successfully!");

    if (this.startFilterDate != null && this.startFilterDate != "" && this.endFilterDate != null && this.endFilterDate != "") {



      var sDate = this.startFilterDate.toString();
      var eDate = this.endFilterDate.toString();
      var sStartYear = sDate.substring(0, 4);
      var sStartMonth = sDate.substring(5, 7);
      var sStartDay = sDate.substring(8, 10);
      var eStartYear = eDate.substring(0, 4);
      var eStartMonth = eDate.substring(5, 7);
      var eStartDay = eDate.substring(8, 10);

      var dStartDate = new Date(sStartMonth + "/" + sStartDay + "/" + sStartYear);
      var dEndDate = new Date(eStartMonth + "/" + eStartDay + "/" + eStartYear);



      if (dStartDate > dEndDate) {
        this.messageService.add({ severity: 'error', summary: "You cannot choose a start date that is later than end date"});
      } else {

        this.products = new Array();

        this.productService.retrieveFilteredProducts(this.startFilterDate, this.endFilterDate, this.selectedProductName, this.selectedEnumCategory).subscribe(
          response => {

            this.products = response;
            console.log("**************" + JSON.stringify(this.products));
          },
          error => {
            console.log("Error retrieving products : " + error);
          }
        );
      }

    } else if ((this.startFilterDate == null || this.startFilterDate == "") && (this.endFilterDate == null || this.endFilterDate == "")) {
      console.log ("*******************************UPDATEDDDD this.products" + JSON.stringify(this.products));
      this.products = this.productsFixed;
      console.log ("*******************************FIXED PRODUCTS" + JSON.stringify(this.productsFixed));
    }
  }

}
