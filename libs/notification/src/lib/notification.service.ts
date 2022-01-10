import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {NotificationBodyComponent, NotificationData, NotificationType} from './notification-body.component';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class NotificationService {
  durationInSeconds = 5;

  config: MatSnackBarConfig = {
    duration: this.durationInSeconds * 1000,
    data: NotificationData,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    panelClass: 'snack-bar-container',
  };

  constructor(
    private readonly snackBar: MatSnackBar,
  ) {}

  public showError(message: string) {
    this.config.data = new NotificationData('error', message, NotificationType.ERROR);
    this.snackBar.openFromComponent(NotificationBodyComponent, this.config);
  }

  public showHttpResponseErrorFor(err: Error) {
    if (!(err instanceof HttpErrorResponse)) {
      throw err;
    }

    const errMessage = typeof err?.error === 'string' ? JSON.parse(err?.error)?.message : err?.error.message;
    this.config.data = new NotificationData('error', errMessage, NotificationType.ERROR);
    this.snackBar.openFromComponent(NotificationBodyComponent, this.config);
  }

  public showInfo(message: string) {
    this.config.data = new NotificationData('info', message, NotificationType.INFO);
    this.snackBar.openFromComponent(NotificationBodyComponent, this.config);
  }

  public showWarning(message: string) {
    this.config.data = new NotificationData('warning', message, NotificationType.WARNING);
    this.snackBar.openFromComponent(NotificationBodyComponent, this.config);
  }

  public show({ message, title, type }:
                {
                  message: string,
                  title: string,
                  type: NotificationType
                }) {
    this.config.data = new NotificationData(title, message, type);
    this.snackBar.openFromComponent(NotificationBodyComponent, this.config);
  }

}
