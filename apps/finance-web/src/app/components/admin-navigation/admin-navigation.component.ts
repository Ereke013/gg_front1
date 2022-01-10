import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from "@finance-web/services/authentication.service";
import {disableNavigateOnRole} from '@finance-web/app/shares/util-method';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnInit {

  items: NavigationItem[] = [];
  currUrl: string = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.currUrl = this.router.url;
    this.items = disableNavigateOnRole(this.authenticationService.currentEmployeeValue);
  }

  navigateTo(url: string) {
    this.currUrl = '/' + url;
    this.router.navigate([url]).then();
  }

}

export class NavigationItem {

  title: string;
  url: string;
  accessRoles: string[];

}
