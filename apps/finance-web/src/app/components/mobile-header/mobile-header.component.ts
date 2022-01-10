import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SubSink} from '@finance.workspace/shared/util';
import {DialogChangeLocationComponent} from '@finance-web/app/components/change-location/dialog-change-location.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CreditConsumerController} from '@finance-web/controller/CreditConsumerController';
import {DEFAULT_LANGUAGE_CODE, LanguageService} from '@finance-web/services/language.service';
import {AuthenticationService} from '@finance-web/services/authentication.service';
import {UserRole} from '@finance-web/models/client/UserRole';
import {DefaultModel} from "@finance-web/models/location/DefaultModel";

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit, OnDestroy {

  isHamClicked: boolean = false;
  isLogIn: boolean = false;

  subSink = new SubSink();
  selectedTab: string = '';

  cityLocation: string = '';
  cityCode: string;

  roles: any;

  @Output() isMenuOpened = new EventEmitter<boolean>();

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  languages = [];
  currentLanguage = DEFAULT_LANGUAGE_CODE;

  constructor(public dialog: MatDialog,
              private router: Router,
              private languageService: LanguageService,
              private clientController: CreditConsumerController,
              private authService: AuthenticationService) {

    this.languages = languageService.getLanguages();
    this.currentLanguage = languageService.getCurrentLanguageTitle();

  }

  ngOnInit(): void {
    this.selectedTab = this.router.url.split('').reverse().join('').split('/')[0].split('').reverse().join('');
    this.setLocationCity();

    if (JSON.parse(localStorage.getItem('auth'))) {
      this.roles = JSON.parse(localStorage.getItem('auth')).roles;
      this.roles.forEach(it => {
        if (it === UserRole.UNAUTHORIZED_CLIENT) {
          this.isLogIn = true;
          return;
        }
      });
    } else {
      this.isLogIn = true;
    }
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  manageMenu() {
    this.isHamClicked = !this.isHamClicked;
    this.isMenuOpened.emit(this.isHamClicked);
  }

  changeLocation() {
    const dialogRef = this.dialog.open(DialogChangeLocationComponent, {
      restoreFocus: false,
      height: '80vh',
      autoFocus: false
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => {
      this.setLocationCity();
      // this.menuTrigger.focus();
      window.location.reload();
    });
  }

  changeLanguage(id) {
    this.languageService.changeLanguage(id);
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

  changeCurrentPath(path: string) {
    this.selectedTab = path;
    this.manageMenu();
    let isExist = false;
    if (path === 'log_in') {
      this.router.navigate(['/login']).then();
      return;
    } else if (path === 'log_out') {
      this.authService.logout();
      return;
    } else if (path === 'main') {
      this.router.navigate(['/client']).then();
      return;
    }
    if (path === 'profile' || path === 'favorites') {
      this.roles.forEach(it => {
        if (it !== UserRole.UNAUTHORIZED_CLIENT) {
          this.router.navigate(['/profile'], {queryParams: {path}}).then();
          isExist = true;
          return;
        }
      });
    }
    if (isExist) {
      return;
    }
    this.router.navigate(['/client/' + path]).then();
  }
}
