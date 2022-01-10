import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('jkKHRrO58w4NbzKD8P5mB7d4an5zm0 ::: ', req)
    return next.handle(req);
    // if (req.url.includes('jsonplaceholder.typicode.com')) {
    //   const paramReq = req.clone({
    //     params: req.params.set(
    //       'userId',
    //       '7'
    //     )
    //   });
    //   return next.handle(paramReq);
    // } else {
    //   return next.handle(req);
    // }

  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authHeader = this.auth.getToken();
    const authHeader = 'Bearer 1A2b3C4d5E6f7G8h9IAgBKClD';
    console.log('s3C2zoSQnbb1Se69mdsy:::')

    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        authHeader
      )
    });

    return next.handle(authReq);
  }
}
