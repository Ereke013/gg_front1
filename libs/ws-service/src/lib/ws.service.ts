import { Inject, Injectable } from '@angular/core';
import { iif, Observable, of, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/internal-compatibility';
import { webSocket } from 'rxjs/webSocket';
import { mapBody, safeObserve } from '@finance.workspace/shared/util';
import { shareReplay, skip, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { HttpService } from '@finance.workspace/http-service';
import { ToClient } from './ToClient';
import { ToServer } from './ToServer';
import { WsController } from './WsController';

@Injectable()
export class WsService {

  private readonly subjectMap: { [key: string]: Subject<any> } = {};
  private readonly onConnectionCloseSubject = new Subject<void>();
  private readonly onConnectionReopenSubject = new Subject<void>();
  private readonly MAX_RECONNECT_COUNT = 20;
  private readonly openSubject = new Subject<Event>();
  private readonly sessionController: WsController = this.cd('session', true);
  private token: string;
  private onTokenReady = this.openSubject.asObservable().pipe(
    startWith({}),
    switchMap(() => iif(() => !!this.token, of(this.token), safeObserve(this.loadToken()))),
    tap(token => this.token = token),
    tap(token => this.sessionController.send('set-session-info', {
      token: token,
      timeOffsetZoneInMinutes: new Date().getTimezoneOffset()
    })),
    switchMap(() => this.sessionController.on<void>('set-session-info-complete').pipe(take(1))),
    tap(() => this.onConnectionReopenSubject.next()),
    shareReplay({ bufferSize: 1, refCount: false })
  );
  private origin: WebSocketSubject<any>;
  private reconnectCount = 0;

  constructor(
    @Inject('urlPrefix') private readonly urlPrefix: string,
    private readonly httpService: HttpService
  ) {
    this.connect();
  }

  freshConnect() {
    this.reconnectCount = 0;
    this.connect();
  }

  connect() {

    if (!this.httpService.token) {
      return;
    }

    const closeSubject = new Subject<CloseEvent>();
    const closingSubject = new Subject<void>();

    this.origin = webSocket({
      url: this.urlPrefix,
      openObserver: this.openSubject,
      closeObserver: closeSubject,
      closingObserver: closingSubject
    });

    closeSubject.pipe(takeUntil(closingSubject)).subscribe(() => this.reconnect());

    this.origin.subscribe({
      next: msg => this.comeMessage(msg)
    });

  }

  onConnectionClose(): Observable<void> {
    return this.onConnectionCloseSubject.asObservable();
  }

  onConnectionReopen(): Observable<void> {
    return this.onConnectionReopenSubject.asObservable().pipe(skip(1));
  }

  cd(rootPath: string, ignoringToken: boolean = false): WsController {
    const self = this;
    return new class implements WsController {

      private path(subPath: string) {
        return rootPath ? rootPath + '/' + subPath : subPath;
      }

      on<T>(subPath: string): Observable<T> {

        const fullPath = this.path(subPath);

        {
          const subject = self.subjectMap[fullPath];
          if (subject) {
            return subject;
          }
        }

        {
          const subject = new Subject<T>();
          self.subjectMap[fullPath] = subject;
          return subject;
        }

      }

      onConnectionClose(): Observable<void> {
        return self.onConnectionClose();
      }

      onConnectionReopen(): Observable<void> {
        return self.onConnectionReopen();
      }

      send(subPath: string, params?: { [paramName: string]: any }) {
        const service = this.path(subPath);
        const msg = { service, params: params ?? {} } as ToServer;
        if (ignoringToken) {
          self.origin.next(msg);
          return;
        }
        self.onTokenReady.pipe(take(1)).subscribe(() => self.origin.next(msg));
      }

    }();
  }

  disconnect() {
    this.token = undefined;
    this.origin?.complete();
    this.origin?.unsubscribe();
  }

  private comeMessage(message: ToClient) {
    const service = message.service;
    const subject = this.subjectMap[service];
    if (!subject) {
      console.error('69T8GDl8ut :: No subject for service ' + service + ' when come message: ', message);
      return;
    }
    subject.next(message.body);
  }

  private reconnect() {

    this.onConnectionCloseSubject.next();

    delayTime(this.delayTimeoutMs()).then(() => {

      this.reconnectCount++;

      console.log('EwVt4MKtcQ :: this.reconnectCount = ' + this.reconnectCount);

      if (this.reconnectCount < this.MAX_RECONNECT_COUNT) {
        this.connect();
      }

    });

  }

  private delayTimeoutMs(): number {
    if (this.reconnectCount <= 3) {
      return 700;
    }
    if (this.reconnectCount <= 6) {
      return 1400;
    }
    if (this.reconnectCount <= 9) {
      return 2800;
    }
    if (this.reconnectCount <= 12) {
      return 5600;
    }
    if (this.reconnectCount <= 15) {
      return 11200;
    }
    return 16000;
  }

  private loadToken(): Observable<string> {
    return mapBody(this.httpService.post<string>('/auth/load-token'));
  }

}

function delayTime(number: number) {
  return new Promise<void>(resolve => setTimeout(() => resolve(), number));
}
