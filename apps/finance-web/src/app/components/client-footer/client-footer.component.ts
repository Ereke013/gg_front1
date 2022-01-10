import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-footer',
  templateUrl: './client-footer.component.html',
  styleUrls: ['./client-footer.component.scss']
})
export class ClientFooterComponent implements OnInit {
  constructor(private router: Router,) {
  }

  ngOnInit(): void {
  }

  linkTo(link: string) {
    this.router.navigate(['/' + link]).then();
  }
}
