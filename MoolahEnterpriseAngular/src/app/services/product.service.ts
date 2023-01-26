import { Injectable } from '@angular/core';
import { ProductEntity } from '../models/product-entity';
import { SessionService } from '../services/session.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WholeLifeProductEntity } from '../models/whole-life-product-entity';
import { TermLifeProductEntity } from '../models/term-life-product-entity';
import { EndowmentEntity } from '../models/endowment-entity';
import { ProductEntityWrapper } from '../models/product-entity-wrapper';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "/api/Product";

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {

  }

  createProductForWholeLife(newProduct: WholeLifeProductEntity, isSmoker: boolean): Observable<number> {
    console.log(JSON.stringify(newProduct));
    return this.httpClient.put<number>(this.baseUrl + "/WholeLifeProductEntity?email=" + this.sessionService.getCompany().companyEmail + "&password=" + this.sessionService.getPassword() + "&isSmoker=" + isSmoker, newProduct, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createProductForTermLife(newProduct: TermLifeProductEntity, isSmoker: boolean): Observable<number> {
    console.log(JSON.stringify(newProduct));
    return this.httpClient.put<number>(this.baseUrl + "/TermLifeProductEntity?email=" + this.sessionService.getCompany().companyEmail + "&password=" + this.sessionService.getPassword() + "&isSmoker=" + isSmoker, newProduct, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createProductForEndowment(newProduct: EndowmentEntity, isSmoker: boolean): Observable<number> {
    console.log(JSON.stringify(newProduct));
    return this.httpClient.put<number>(this.baseUrl + "/Endownment?email=" + this.sessionService.getCompany().companyEmail + "&password=" + this.sessionService.getPassword() + "&isSmoker=" + isSmoker, newProduct, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  retrieveCompanyProducts(): Observable<ProductEntity[]> {
    return this.httpClient.get<ProductEntity[]>(this.baseUrl + "/retrieveListOfProductByCompany?email=" + this.sessionService.getEmail() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    );
  }

  updateCompanyProduct(updateProduct: ProductEntity): Observable<ProductEntity> {
    return this.httpClient.post<ProductEntity>(this.baseUrl + "?email=" + this.sessionService.getEmail() + "&password=" + this.sessionService.getPassword(), updateProduct, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateEndowmentProduct(updateProduct: EndowmentEntity, isSmoker: boolean): Observable<ProductEntity> {
    return this.httpClient.post<ProductEntity>(this.baseUrl + "/updateProductInformationEndowment?email=" + this.sessionService.getEmail() + "&password=" + this.sessionService.getPassword() + "&isSmoker=" + isSmoker, updateProduct, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateTermLifeProduct(updateProduct: TermLifeProductEntity, isSmoker: boolean): Observable<ProductEntity> {
    return this.httpClient.post<ProductEntity>(this.baseUrl + "/updateProductInformationTermLife?email=" + this.sessionService.getEmail() + "&password=" + this.sessionService.getPassword() + "&isSmoker=" + isSmoker, updateProduct, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateWholeLifeProduct(updateProduct: WholeLifeProductEntity, isSmoker: boolean): Observable<ProductEntity> {
    console.log(JSON.stringify(updateProduct));
    return this.httpClient.post<ProductEntity>(this.baseUrl + "/updateProductInformationWholeLife?email=" + this.sessionService.getEmail() + "&password=" + this.sessionService.getPassword() + "&isSmoker=" + isSmoker, updateProduct, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(productId: number): Observable<string> {
    return this.httpClient.get<string>(this.baseUrl + "/deleteProductListing?productId=" + productId + "&email=" + this.sessionService.getEmail() + "&password=" + this.sessionService.getPassword()).pipe(
      catchError(this.handleError)
    );
  }

  retrieveSpecificProduct(productId: number): Observable<ProductEntity> {
    console.log(this.baseUrl);
    return this.httpClient.get<ProductEntity>(this.baseUrl + "/retrieveProductEntityById?productId=" + productId).pipe(
      catchError(this.handleError)
    );
  }

  retrieveSpecificProductWrapper(productId: number): Observable<ProductEntityWrapper> {
    console.log(this.baseUrl);
    return this.httpClient.get<ProductEntityWrapper>(this.baseUrl + "/retrieveProductEntityWrapperById?productId=" + productId).pipe(
      catchError(this.handleError)
    );
  }

  retrieveFilteredProducts(startDate: string, endDate: string, selectedProductName : string, selectedEnumCategory : string ) : Observable<ProductEntity []>{
    return this.httpClient.get<ProductEntity[]>(this.baseUrl + "/filterProductByDateCreated?email=" + this.sessionService.getEmail() + "&password=" + this.sessionService.getPassword() + "&startDate=" +
    startDate + "&endDate=" + endDate + "&productName=" + selectedProductName + "&productCategory=" + selectedEnumCategory).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(errorMessage);
  }
}
