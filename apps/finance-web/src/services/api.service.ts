import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url(endpoint: string): string {
    return environment.apiUrl + endpoint;
  }

  constructor(private http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    const defReqOpts = {
      withCredentials: true,
      params: new HttpParams(),
      headers: new HttpHeaders()
    };

    if (reqOpts) {
      for (const k in reqOpts) {
        defReqOpts.headers = defReqOpts.headers.set(k, reqOpts[k]);
      }
    }

    // Support easy query params for GET requests
    if (params) {
      defReqOpts.params = new HttpParams();
      for (const k in params) {
        const value = params[k];
        if (value !== undefined) {
          defReqOpts.params = defReqOpts.params.set(k, value);
        }
      }
    }

    return this.http.get(this.url(endpoint), defReqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    const defReqOpts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true,
    };

    if (reqOpts) {
      for (const k in reqOpts) {
        defReqOpts.headers = defReqOpts.headers.set(k, reqOpts[k]);
      }
    }

    return this.http.post(this.url(endpoint), body, defReqOpts);
  }
}
