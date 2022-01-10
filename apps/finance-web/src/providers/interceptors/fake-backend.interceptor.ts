import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {AuthEmployee} from '@models/authEmployee';
import {environment} from '../../environments/environment';

// array in local storage for registered employees
let employees: AuthEmployee[] =
  [
    new AuthEmployee('0', 'Admin', 'Admin', undefined)
  ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.production) {
      return next.handle(request);
    }

    const {url, method, headers, body} = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/employee/authorize') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const {login: username, password} = body;
      const employee = employees.find(x => x.name === username && x.name === password);

      if (!employee) {
        return error('Не верные логин или пароль');
      }

      return ok({
        id: employee.id,
        name: employee.name,
        surname: employee.surname,
        windowNumber: employee.windowNumber,
        windowStatus: employee.windowStatus,
        token: '1'
      })
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}))
    }

    function error(message) {
      return throwError({error: {message}});
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}
