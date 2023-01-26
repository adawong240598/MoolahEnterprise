import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  providers: [MessageService]

})
export class ForgetPasswordComponent implements OnInit {

  
  submitted: boolean = false;
  message: string | undefined;
  email: string = "";


  constructor(private companyService : CompanyService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  enterEmail(enterEmailForm: NgForm){

    if(this.email==""){
      this.messageService.add({ severity: 'error', summary: "Email is cannot be empty!", detail: 'Via MessageService' });
      return;
    } 

      this.companyService.sendOTP(this.email).subscribe(
        response => {
          
          this.message = "An OTP has successfully been sent to your email";
          this.messageService.add({ severity: 'success', summary: this.message, detail: 'Via MessageService' });
          this.submitted = true;
        },
        error => {
        
          this.message = "OTP has failed to send. Please check the email you have inputted!";
          console.log(error);
          this.messageService.add({ severity: 'error', summary: this.message, detail: 'Via MessageService' });
        }
      );
    }

  

  keyNewPassword() {
    if(this.submitted = true) {
      this.router.navigate(["/password/keyNewPassword"]);
    }
  
  }
  

  
}
