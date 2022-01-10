import {
  Component, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {DialogChangeLocationComponent} from '@finance-web/app/components/change-location/dialog-change-location.component';
import {Router} from '@angular/router';
import {UserRole} from '@finance-web/models/client/UserRole';
import {CreditConsumerController} from '@finance-web/controller/CreditConsumerController';
import {AuthenticationService} from '@finance-web/services/authentication.service';
import {
  DEFAULT_LANGUAGE_CODE,
  LanguageService
} from '@finance-web/services/language.service';
import {StorageSecure} from '@finance-web/providers/modules/StorageSecure';
import {DefaultModel} from '@finance-web/models/location/DefaultModel';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit, OnDestroy {

  isMenuIconClicked: boolean = false;
  isLogIn: boolean = false;
  isClientPage: boolean = false;
  isNewsPage: boolean = false;
  isAdmin: boolean = false;

  roles: any;

  cityLocation: string = '';
  cityCode: string;

  languages = [];
  currentLanguage = DEFAULT_LANGUAGE_CODE;

  subscription: Subscription;

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(public dialog: MatDialog,
              private router: Router,
              private languageService: LanguageService,
              private storageSecure: StorageSecure,
              private clientController: CreditConsumerController,
              private authService: AuthenticationService) {

    this.languages = languageService.getLanguages();
    this.currentLanguage = languageService.getCurrentLanguageTitle();
    this.subscription = this.authService.currentEmployee.subscribe(res => {
      if (JSON.parse(localStorage.getItem('auth'))) {
        this.roles = JSON.parse(localStorage.getItem('auth')).roles;
        this.roles.forEach(it => {
          if (it === UserRole.UNAUTHORIZED_CLIENT) {
            this.isLogIn = true;
            return;
          } else if (it === UserRole.ADMIN || it === UserRole.FO_MANAGER || it === UserRole.NEWS_MANAGER
            || it === UserRole.APPLICATION_MANAGER || it === UserRole.PRODUCT_MANAGER) {
            this.isLogIn = false;
            this.isAdmin = true;
          }
        });
      } else {
        this.isLogIn = true;
      }
    });
  }

  ngOnInit(): void {
    const url = this.router.url;

    this.isClientPage = (url && url.startsWith('/client'));
    this.isNewsPage = (url && url.startsWith('/news'));

    this.setLocationCity();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeLocation() {
    const dialogRef = this.dialog.open(DialogChangeLocationComponent, {
      restoreFocus: false,
      autoFocus: false,
      height: '80vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      const cityCode = this.cityCode;
      this.setLocationCity();
      this.refreshPage(cityCode);
    });
  }

  setShowMenuPanel() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
  }

  linkToProfile(path: string) {

    if (path === 'log_in') {
      this.router.navigate(['/login']).then();
      return;
    } else if (path === 'log_out') {
      this.authService.logout();
      return;
    }

    // if (!this.roles) {
    //   this.router.navigate(['/login'], {queryParams: {path}}).then();
    //   return;
    // }

    if (path === 'admin') {
      this.roles.forEach(it => {
        if (it === UserRole.ADMIN || it === UserRole.FO_MANAGER || it === UserRole.NEWS_MANAGER
          || it === UserRole.APPLICATION_MANAGER || it === UserRole.PRODUCT_MANAGER) {
          this.router.navigate(['/admin']).then();
          return;
        }
      });
    }
    else{
      this.router.navigate(['/profile'], {queryParams: {path}}).then();
    }
  }

  linkToCreditSelection() {
    this.router.navigate(['/client']).then();
  }

  linkToNews() {
    this.router.navigate(['/news']).then();
  }

  setLocationCity() {
    this.cityCode = localStorage.getItem('location');
    if (!this.cityCode) {
      this.cityCode = DefaultModel.ALMATY_LOCATION;
      localStorage.setItem('location', this.cityCode);
    }
    this.clientController.getCityByCode(this.cityCode).then(res => {
      this.cityLocation = res;
    });
  }

  refreshPage(cityCode: string) {
    if (localStorage.getItem('location') !== cityCode) {
      window.location.reload();
    }
  }

  changeLanguage(code: string) {
    this.languageService.changeLanguage(code);
  }
}
