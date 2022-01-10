import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '@finance.workspace/notification';
import {extractErrorType} from '@finance.workspace/shared/util';
import {Errors} from '@finance.workspace/shared/model';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(
    private readonly service: NotificationService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {

        if (err.error instanceof Blob) {
          err.error.text().then((x: any) => {
            err.error = JSON.parse(x);
            const errorTypeIn = extractErrorType(err);
            if (errorTypeIn) this.service.showHttpResponseErrorFor(err);
          });

          throw err;
        }

        const errorType = extractErrorType(err);
        if (!errorType || errorType === Errors.SecurityError) {
          throw err;
        }

        this.service.showHttpResponseErrorFor(err);
        throw err;
      }),
    );
  }
}
