import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import { AuthenticationService } from '@finance-web/services/authentication.service';
import { AuthService } from '@finance-web/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '@finance-web/services/language.service';
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private authServ: AuthService,
              private languageService: LanguageService,
              private router: Router,
              private _dialog: MatDialog) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Токен добавляется в HttpService
    request = request.clone({
      setHeaders: {
        lang: this.languageService.currentLanguageCode
      }
    });


    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.authenticationService.logout();
        this._dialog.closeAll();
        this.router.navigateByUrl('/login').then();
      }
      return throwError(err);
    }));
  }

}
