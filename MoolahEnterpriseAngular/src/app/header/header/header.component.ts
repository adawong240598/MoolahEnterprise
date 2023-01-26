import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { CompanyService } from 'src/app/services/company.service';

import { CompanyEntity } from '../../models/company-entity';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  @Output()
  childEvent = new EventEmitter();

  email: string | undefined;
  password: string | undefined;
  //loginError: boolean;
  errorMessage: string | undefined;
  

  items: MenuItem[];
  accounts: MenuItem[];
  display: boolean = false;
  displayDialog: boolean = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private companyService: CompanyService,
    private messageService: MessageService) {
    //this.loginError = false;
    this.items = new Array();
    this.accounts = new Array();
  }




  ngOnInit(): void {
    if (this.sessionService.getIsLogin() == false) {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/index'
        },
        {
          label: 'About Us',
          icon: 'pi pi-info-circle',
          routerLink: '/aboutus/aboutUs'
        },
        {
          label: 'Create Company Account',
          icon: 'pi pi-user',
          routerLink: '/company/createCompany'
        }
      ];
    } else {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/index'
        },
        {
          label: 'About Us',
          icon: 'pi pi-info-circle',
          routerLink: '/aboutus/aboutUs'
        },
        {
          label: 'View My Products',
          icon: 'pi pi-book',
          routerLink: '/product/viewAllProducts'
        },
        {
          label: 'Create New Product',
          icon: 'pi pi-plus',
          routerLink: '/product/createProduct'
        }

      ];

      this.accounts = [
        {
          label: 'Top up Credit',
          icon: 'pi pi-credit-card',
          routerLink: '/makePayment'
        },
        {
          label: 'View My Profile',
          icon: 'pi pi-user-edit',
          routerLink: '/company/viewMyCompanyDetails'
        }, {
          label: 'My Outstanding Bills',
          icon: 'pi pi-user-edit',
          routerLink: '/viewCurrentPayable'

        },{
          label: 'View Transaction',
          icon: 'pi pi-user-edit',
          routerLink: '/transaction/view'

        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            this.companyLogout();
          }
        }

      ];

    }

  }

  companyLogin(): void {
    console.log('Hello I did it!');
    this.sessionService.setEmail(this.email);
    this.sessionService.setPassword(this.password);
    this.companyService.login(this.email, this.password).subscribe(
      response => {
        let company: CompanyEntity = response;
        this.ngOnInit();

        if (company != null) {
          console.log(JSON.stringify(response));
          this.sessionService.setIsLogin(true);
          this.sessionService.setCompany(company);
         // this.loginError = false;

          this.childEvent.emit();

          this.router.navigate(["/index"]);
          this.items = [
            {
              label: 'Home',
              icon: 'pi pi-home',
              routerLink: '/index'
            },
            {
              label: 'About Us',
              icon: 'pi pi-info-circle',
              routerLink: '/aboutus/aboutUs'
            },
            {
              label: 'View My Products',
              icon: 'pi pi-book',
              routerLink: '/product/viewAllProducts'
            },
            {
              label: 'Create New Product',
              icon: 'pi pi-plus',
              routerLink: '/product/createProduct'
            }

          ];

          this.accounts = [
            {
              label: 'Top up Credit',
              icon: 'pi pi-credit-card',
              routerLink: '/makePayment'
            },
            {
              label: 'View My Profile',
              icon: 'pi pi-user-edit',
              routerLink: '/company/viewMyCompanyDetails'
            },
            {
              label: 'My Oustanding Bills',
              icon: 'pi pi-user-edit',
              routerLink: '/viewCurrentPayable'
            },
            {
              label: 'View Transaction',
              icon: 'pi pi-user-edit',
              routerLink: '/transaction/view'
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => {
                this.companyLogout();
              }
            },

          ];
        }
        else {
          this.messageService.add({ severity: 'error', summary: "Invalid login. Please try again", detail: 'Via MessageService' });
     
         // this.loginError = true;
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: "Something went wrong when retrieving your data :" + error, detail: 'Via MessageService' });
     
        //this.loginError = true;
        //this.errorMessage = error
      }
    );
  }


  companyLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCompany(null);
    this.sessionService.setEmail("");
    this.sessionService.setPassword("");
    sessionStorage.clear();
    this.ngOnInit();
    this.router.navigate(["/index"]);
  }

  getMenuItems(): MenuItem[] {
    return this.items;
  }

  setMenuItems() {
    return this.items;
  }

  handleOnClick($event: any) {
    this.display = true;
  }
}
