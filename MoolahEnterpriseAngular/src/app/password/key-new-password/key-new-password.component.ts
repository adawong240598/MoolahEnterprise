import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-key-new-password',
  templateUrl: './key-new-password.component.html',
  styleUrls: ['./key-new-password.component.css'],
  providers: [MessageService]
})
export class KeyNewPasswordComponent implements OnInit {

  submitted: boolean = false;
  message: string | undefined;

  newPassword : string = "";
  repeatNewPassword: string = "";
  email: string = "";
  otp: number = 0;


  constructor(private companyService : CompanyService, private messageService : MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  
  keyNewPassword(enterPasswordForm: NgForm){

    if(this.email==""){
      this.messageService.add({ severity: 'error', summary: "Email is cannot be empty!"});
      return;
    } else if(this.otp == 0){
      this.messageService.add({ severity: 'error', summary: "Please enter your given OTP!" });
      return;
    } else if(this.newPassword == ""){
      this.messageService.add({ severity: 'error', summary: "Password cannot be empty!"});
      return;
    } else if(this.repeatNewPassword == ""){
      this.messageService.add({ severity: 'error', summary: "Enter your password again!"});
      return;
    }
 

    this.companyService.resetCompanyPassword(this.email, this.otp, this.newPassword, this.repeatNewPassword).subscribe(
        response => {
          this.message = "Password has successfully been reset!";
          this.messageService.add({ severity: 'success', summary: this.message });
          this.submitted = true;

        },
        error => {
          this.message = "Password has failed to update! Please check your details!";
          console.log(error);
          this.messageService.add({ severity: 'error', summary: this.message});
        }
      );
    

  }


  backToHome() {
    this.router.navigate(["/index"]);
  }

}
