import { Injectable } from '@angular/core';

import { CompanyEntity } from '../models/company-entity';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getCompany(): CompanyEntity {
    return JSON.parse(sessionStorage.company);
  }

  getImageURLFromServer(company: CompanyEntity | null): string {
    if (company == null) {
      return "";
    } else {
      return "http://localhost:8080/MoolahEnterprise-war/resources/images/" + company.companyImage;
    }
  }

  setCompany(company: CompanyEntity | null): void {
    sessionStorage.company = JSON.stringify(company);
  }

  getIsLogin(): boolean {
    if (sessionStorage.isLogin == "true") {
      return true;
    }
    else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage.isLogin = isLogin;
  }

  getEmail(): string {
    return sessionStorage.email;
  }

  setEmail(email: string | undefined) {
    sessionStorage.email = email;
  }

  getPassword(): string {
    return sessionStorage.password;
  }

  setPassword(password: string | undefined) {
    sessionStorage.password = password;
  }

  checkAccessRight(path: string): boolean {
    if (this.getIsLogin()) {
      return true;
    }
    else {
      return false;
    }
  }

  checkCreditOwned(): boolean{
    console.log(this.getCompany().creditOwned);
    return this.getCompany().creditOwned < 1000;
  }
}
