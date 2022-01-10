import { Injectable } from '@angular/core';
import {
  ReplaySubject,
  BehaviorSubject
} from 'rxjs';
import { StorageSecure } from '../providers/modules/StorageSecure';
import { Platform } from '@angular/cdk/platform';
import { StorageSecureKeyEnum } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly tokenBehaviorSubject = new BehaviorSubject<string>(null);
  private readonly tokenReplaySubject = new ReplaySubject<string>(1);

  public token$ = this.tokenReplaySubject.asObservable();

  constructor(private storageSecure: StorageSecure,
              public platform: Platform) {
  }

  prepareData() {
    this.getToken().then((ggToken) => {
      this.tokenBehaviorSubject.next(ggToken);
      this.tokenReplaySubject.next(ggToken);
    });
  }

  public get tokenValue(): string {
    return this.tokenBehaviorSubject.value;
  }

  public writeToken(ggToken) {
    this.tokenBehaviorSubject.next(ggToken);
    this.tokenReplaySubject.next(ggToken);
    this.setToken(ggToken);
  }

  private setToken(ggToken: string): Promise<string> {
    return this.storageSecure.setItem(StorageSecureKeyEnum.TOKEN, ggToken);
  }

  getToken() {
    return this.storageSecure.getItem(StorageSecureKeyEnum.TOKEN);
  }

}
