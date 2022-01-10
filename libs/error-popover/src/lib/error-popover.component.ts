import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-popover',
  templateUrl: './error-popover.component.html',
  styleUrls: ['./error-popover.component.scss'],
})
export class ErrorPopoverComponent {
  @Input() text: string;
}
