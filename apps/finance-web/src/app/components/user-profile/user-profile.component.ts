import {Component, OnDestroy, OnInit} from '@angular/core';
import {LeftMenu} from '@finance-web/models/profile/LeftMenu';
import {ScreenUtil} from '@finance-web/app/shares/ScreenUtil';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  leftMenu: LeftMenu[] = [];
  selectedLeftTab: LeftMenu;

  isMobile: boolean = false;
  subscription: Subscription;

  path: string;

  constructor(private router: Router,
              private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.leftMenu = [
      {
        title: 'borrower_data', icon: 'user'
      },
      {
        title: 'pledge_data', icon: 'document'
      },
      {
        title: 'change_password', icon: 'lock'
      }
    ];

    this.subscription = this.actRoute.queryParams.subscribe(res => {
      const x = res['path'];
      if (x.split('&')[0]) {
        this.path = x.split('&')[0];
      }
      if (x.split('&')[1]) {
       this.selectedLeftTab = this.leftMenu.filter(z => z.title === x.split('&')[1])[0];
      }
      else {
        this.selectedLeftTab = this.leftMenu[0];
      }
    });

    this.isMobile = ScreenUtil.isSmall;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  selectLeftTab(info: LeftMenu) {
    this.selectedLeftTab = info;
    const path = this.path + '&' + info.title;
    this.router.navigate(['/profile'], {queryParams: {path}}).then();
  }
}
