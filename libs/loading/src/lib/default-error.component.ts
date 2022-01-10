import {Component} from '@angular/core';

@Component({
  templateUrl: './default-error.component.html',
  styleUrls: ['./default-error.component.scss'],
})
export class DefaultErrorComponent {
  error: Error;
}
