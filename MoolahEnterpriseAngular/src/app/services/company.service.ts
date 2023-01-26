import { UploadPath } from './../models/upload-path';
import { Injectable } from '@angular/core';

import { CreateCompanyEntityReq } from '../models/create-company-entity-req';
import { CompanyEntity } from '../models/company-entity';
import { PointOfContactEntity } from '../models/point-of-contact-entity';
import { SessionService } from '../services/session.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl: string = "/api/Company";

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  createNewCompany(newCompany: CreateCompanyEntityReq): Observable<number> {
    return this.httpClient.put<number>(this.baseUrl + "/createNewRecord", newCompany, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  uploadCompanyImage(file: File): Observable<UploadPath> {
    console.log("uploadCompanyImage");
    let formData: FormData = new FormData()
    formData.append('json', JSON.stringify(file));
    //  formData.append('json', file, file.name);
    console.log("formData = " + JSON.stringify(file));
    return this.httpClient.post<UploadPath>("/api/File/upload", formData, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  login(companyEmail: string | undefined, password: string | undefined): Observable<CompanyEntity> {
    return this.httpClient.get<CompanyEntity>(this.baseUrl + "/login?email=" + companyEmail + "&password=" + password).pipe(
      catchError(this.handleError)
    );
  }

  updateCompany(updateCompany: CompanyEntity | undefined): Observable<CompanyEntity> {
    if (updateCompany === null || updateCompany === undefined) {
      return new Observable();
    } else {
      return this.httpClient.post<CompanyEntity>(this.baseUrl + "/updateCompanyInformation?email=" + updateCompany.companyEmail + "&password=" + updateCompany.password,
        updateCompany, httpOptions).pipe(
          catchError(this.handleError)
        );
    }
  }

  retrieveCompany(): Observable<CompanyEntity> {
    return this.httpClient.get<CompanyEntity>(this.baseUrl + "/retrieveAllRecordsById?email=" + this.sessionService.getEmail()).pipe(
      catchError(this.handleError)
    );
  }

  deactivateCompany(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/deactivateAccount?email=" + this.sessionService.getCompany().companyEmail + "&password=" + this.sessionService.getPassword()).pipe(
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

  updateCompanyPassword(updateCompany: CompanyEntity, oldPassword: string, newPassword: string, repeatNewPassword: string): Observable<CompanyEntity> {
    if (updateCompany == null || oldPassword === null || newPassword === null || repeatNewPassword === null) {
      return new Observable();
    } else {
      return this.httpClient.post<CompanyEntity>(this.baseUrl + "/updateCompanyPassword" + "?email=" + this.sessionService.getEmail() + "&password=" + this.sessionService.getPassword() + "&oldPassword=" + oldPassword + "&newPassword=" + newPassword + "&repeatNewPassword=" + repeatNewPassword,
        updateCompany, httpOptions).pipe(
          catchError(this.handleError)
        );
    }
  }

  sendOTP(email: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.baseUrl + "/sendOTP?email=" + email).pipe(
      catchError(this.handleError)
    );
  }

  resetCompanyPassword(email: string, otp: number, newPassword: string, repeatNewPassword: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.baseUrl + "/resetCompanyPassword?email=" + email + "&otp=" + otp + "&newPassword=" + newPassword + "&repeatPassword=" + repeatNewPassword).pipe(
      catchError(this.handleError)
    );
  }

  retrieveUploadPath(): Observable<UploadPath> {
    return this.httpClient.get<UploadPath>(this.baseUrl + "/retrieveUploadPath").pipe(
      catchError(this.handleError)
    );
  }
}
