import { HttpService } from '@finance.workspace/http-service';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { skip } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { WsController } from '@finance.workspace/ws-service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class NcaLayerService {
  private origin: WebSocketSubject<any> | undefined;
  private originSubscription: Subscription | undefined;

  private readonly openSubject = new Subject<Event>();
  private readonly closeSubject = new Subject<Event>();
  private readonly subjectMap: { [key: string]: Subject<any> } = {};

  private readonly onConnectionCloseSubject = new Subject<void>();
  private readonly onConnectionReopenSubject = new Subject<void>();

  private readonly onConnectionErrorSubject = new Subject<any>();
  public readonly onConnectionError$ = this.onConnectionErrorSubject.asObservable();

  private readonly responseSubject = new Subject<any>();
  public readonly response$ = this.responseSubject.asObservable();

  constructor(
    @Inject('urlPrefix') protected readonly urlPrefix: string,
    protected readonly httpService: HttpService
  ) {
    this.closeSubject.subscribe(() => this.doConnectionClose());
  }

  connect() {
    this.origin = webSocket({
      url: this.urlPrefix,
      openObserver: this.openSubject,
      closeObserver: this.closeSubject
    });
    this.originSubscription = this.origin.asObservable().subscribe(
      msg => this.comeMessage(msg),
      err => this.comeError(err)
    );
  }

  comeError(err: any) {
    console.error('sPvSMvjL :: error from server', err);
    this.onConnectionErrorSubject.next(err);
  }

  comeMessage(message: any) {
    const subject = this.subjectMap[''];
    subject.next(message.responseObject);
    this.responseSubject.next(message);
  }

  cd(): WsController {
    const self = this;
    return new class implements WsController {
      on<T>(): Observable<T> {
        {
          const subject = self.subjectMap[''];
          if (subject) {
            return subject;
          }
        }

        {
          const subject = new Subject<any>();
          self.subjectMap[''] = subject;
          return subject;
        }

      }

      onConnectionClose(): Observable<void> {
        return self.onConnectionClose();
      }

      onConnectionReopen(): Observable<void> {
        return self.onConnectionReopen();
      }

      send(subPath: string, params: { [paramName: string]: any }) {
        self.origin?.next(params);
      }
    }();
  }

  disconnect() {
    this.origin?.complete();
    this.origin?.unsubscribe();
  }

  public onConnectionClose(): Observable<void> {
    return this.onConnectionCloseSubject.asObservable();
  }

  public onConnectionReopen(): Observable<void> {
    return this.onConnectionReopenSubject.asObservable().pipe(skip(1));
  }

  private doConnectionClose() {
    this.onConnectionCloseSubject.next();

    if (this.originSubscription) {
      this.originSubscription.unsubscribe();
      this.originSubscription = undefined;
    }
  }
}
