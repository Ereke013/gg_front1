import {Observable} from 'rxjs';

export interface WsController {

  on<T>(subPath: string): Observable<T>;

  onConnectionClose(): Observable<void>;

  onConnectionReopen(): Observable<void>;

  send(subPath: string, params?: { [paramName: string]: any });

}
