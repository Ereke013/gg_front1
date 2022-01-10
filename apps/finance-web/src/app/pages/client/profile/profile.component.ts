import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  tabs: string[] = [];
  selectedTab: string;
  subscription: Subscription;

  constructor(private router: Router,
              private actRoute: ActivatedRoute) {
    this.subscription = this.actRoute.queryParams.subscribe(res => {
      this.selectedTab = res['path'].split('&')[0];
    });
  }

  ngOnInit(): void {
    this.tabs = ['profile', 'credit_history', 'favorites', 'applications'];
    this.selectedTab = this.tabs[0];
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.router.url.split('=')[1] === this.tabs[i]) {
        this.selectedTab = this.tabs[i];
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickTab(path: string) {
    if(this.selectedTab !== path){
      this.selectedTab = path;
      this.router.navigate(['/profile'], {queryParams: {path}}).then();
    }
  }
}
