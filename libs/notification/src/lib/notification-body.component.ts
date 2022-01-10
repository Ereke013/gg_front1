import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

export class NotificationData {
  type: NotificationType;
  message: string;
  title: string;

  constructor(title: string, message: string, type: NotificationType) {
    this.title = title;
    this.message = message;
    this.type = type;
  }
}

export enum NotificationType {
  INFO = 'info', WARNING = 'warning', ERROR = 'error_outline', CUSTOM = 'custom', WARNING_BLUE = 'warning_blue'
}

@Component({
  templateUrl: './notification-body.component.html',
  styleUrls: ['./notification-body.component.scss'],
})
export class NotificationBodyComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public readonly data: NotificationData,
    private readonly snackBarRef: MatSnackBarRef<NotificationBodyComponent>,
  ) {}

  close() {
    this.snackBarRef.dismiss();
  }

}
