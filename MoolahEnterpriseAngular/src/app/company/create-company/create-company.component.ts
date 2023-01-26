import { UploadPath } from './../../models/upload-path';
import { ToastModule } from 'primeng/toast';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FooterComponent } from './../../footer/footer/footer.component';
import { HeaderComponent } from './../../header/header/header.component';
import { CreateCompanyEntityReq } from './../../models/create-company-entity-req';
import { CompanyEntity } from './../../models/company-entity';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { NgForm } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PointOfContactEntity } from 'src/app/models/point-of-contact-entity';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
  providers: [MessageService],
})
export class CreateCompanyComponent implements OnInit {

  resultSuccess: boolean = false;
  resultError: boolean = false;
  submitted: boolean = true;
  message: string | undefined;
  createCompanyEntityReq: CreateCompanyEntityReq;

  constructor(private router: Router,
    private browserAnimationsModule: BrowserAnimationsModule,
    private companyService: CompanyService,
    private passwordModule: PasswordModule,
    private buttonModule: ButtonModule,
    private inputTextModule: InputTextModule,
    private fileUploadModule: FileUploadModule,
    private messageService: MessageService) {
    this.createCompanyEntityReq = new CreateCompanyEntityReq();
  }

  ngOnInit(): void {
  }

  create(createCompanyForm: NgForm) {

    if (this.createCompanyEntityReq.companyEntity.companyName == "" || this.createCompanyEntityReq.companyEntity.companyName.length < 3) {
      this.messageService.add({ severity: 'error', summary: "Company name must not be empty!", detail: 'Via MessageService' });
      return;
    } else if (this.createCompanyEntityReq.companyEntity.companyEmail == "") {
      this.messageService.add({ severity: 'error', summary: "Company email must not be empty!", detail: 'Via MessageService' });
      return;
    } else if (this.createCompanyEntityReq.companyEntity.businessRegNumber == "") {
      this.messageService.add({ severity: 'error', summary: "Business Registration Number must not be empty!", detail: 'Via MessageService' });
      return;
    } else if (this.createCompanyEntityReq.companyEntity.companyContactNumber == "" || this.createCompanyEntityReq.companyEntity.companyContactNumber.length != 8) {
      this.messageService.add({ severity: 'error', summary: "Company contact number must not be empty!", detail: 'Via MessageService' });
      return;
    } else if (this.createCompanyEntityReq.companyEntity.companyUrl == "") {
      this.messageService.add({ severity: 'error', summary: "Company url must not be empty!", detail: 'Via MessageService' });
      return;
    } else if (this.createCompanyEntityReq.companyEntity.password === undefined || this.createCompanyEntityReq.companyEntity.password == "") {
      this.messageService.add({ severity: 'error', summary: "Password must not be empty!", detail: 'Via MessageService' });
      return;
    } else if (this.createCompanyEntityReq.listOfPointOfContacts.length <= 0) {
      this.messageService.add({ severity: 'error', summary: "You need to input at least one point of contact!", detail: 'Via MessageService' });
      return;
    } else if (this.createCompanyEntityReq.listOfPointOfContacts.length > 0) {
      this.createCompanyEntityReq.listOfPointOfContacts.forEach(poc => {
        if (!this.checkPOC(poc)) {
          return;
        }
      });
    }


    this.submitted = true;
    if (createCompanyForm.valid) {
      this.companyService.createNewCompany(this.createCompanyEntityReq).subscribe(
        response => {
          let newCompanyId: number = response;
          console.log('********** newCompanyId: ' + newCompanyId);
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "Company " + newCompanyId + " created successfully";
          this.messageService.add({ severity: 'success', summary: this.message, detail: 'Via MessageService' });
          this.clear();
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new company: " + error;
          this.messageService.add({ severity: 'error', summary: this.message, detail: 'Via MessageService' });
          console.log('********** CreateCompanyComponent.ts: ' + error);
        }
      );
    }
  }

  checkPOC(poc: PointOfContactEntity): Boolean {
    if (poc !== undefined || poc !== null) {
      if ((poc.pocName !== undefined && poc.pocName?.length < 3) || poc.pocName === undefined) {
        this.messageService.add({ severity: 'error', summary: "Point of Contact Name is lesser than 3 characters", detail: 'Via MessageService' });
        return false;
      } else if (poc.pocMobileNumber?.length != 8 || poc.pocOfficeNumber?.length != 8) {
        this.messageService.add({ severity: 'error', summary: "Point of Contact Contact Informations are invalid", detail: 'Via MessageService' });
        return false;
      } else if (poc.pocEmail == "") {
        this.messageService.add({ severity: 'error', summary: "Point of Contact Email is empty", detail: 'Via MessageService' });
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  handleClickAdd() {
    if (this.createCompanyEntityReq.listOfPointOfContacts.length + 1 > 4) {
      this.messageService.add({ severity: 'error', summary: "You can only add up to 4 point of contacts", detail: 'Via MessageService' });
    } else {
      this.createCompanyEntityReq.listOfPointOfContacts.push(new PointOfContactEntity());
    }
  }

  handleClickRemove(index: number) {
    this.createCompanyEntityReq.listOfPointOfContacts.splice(index, 1);
  }

  clear() {
    this.createCompanyEntityReq = new CreateCompanyEntityReq();
  }
}
