import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'mb-user-notification-button-set',
  templateUrl: './user-notification-button-set.component.html',
  styleUrls: ['./user-notification-button-set.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserNotificationButtonSetComponent {

  @Input() noExpand = false;
  @Input() noClose = false;
  @Output() expandClick = new EventEmitter<void>();
  @Output() closeClick = new EventEmitter<void>();

}
