import { Component, OnInit } from '@angular/core';
import { ScreenUtil } from '@finance-web/app/shares/ScreenUtil';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  isMobile: boolean = false;
  isMenuOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (ScreenUtil.isSmall) {
      this.isMobile = true;
    }
  }

  configureMenu(event: boolean) {
    this.isMenuOpened = event;
  }
}
