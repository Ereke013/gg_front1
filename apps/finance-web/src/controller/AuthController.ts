import { Injectable } from '@angular/core';
import { HttpService } from '@finance.workspace/http-service';
import { SmsVerification } from '../models/Sign/SmsVerification';
import { SignUp } from '../models/Sign/SignUp';
import { response } from 'express';
import { LoginRequest } from '../models/auth/LoginRequest';
import {UserRequest} from "@finance-web/models/client/UserRequest";
import {ClientActual} from "@finance-web/models/client/ClientActual";

@Injectable({ providedIn: 'root' })
export class AuthController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('auth');
  }

  smsSend(phoneNum: string) {
    return this.http.get('/sms-send', { phoneNumber: phoneNum })
      .toPromise();
  }

  checkPhoneExists(phoneNum: string): Promise<boolean> {
    return this.http.get<boolean>('/check-phone', { phoneNumber: phoneNum })
      .toPromise().then(response => response.body as boolean);
  }

  checkRecoveryPhoneExists(phoneNum: string): Promise<boolean> {
    return this.http.get<boolean>('/check-recovery-phone', { phoneNumber: phoneNum })
      .toPromise().then(response => response.body as boolean);
  }

  checkSms(smsVerification: SmsVerification) {
    return this.http.postJson<string>('/sms-check', smsVerification)
      .toPromise()
      .then(response => response.body);
  }

  signUpClient(clientSignUp: SignUp): Promise<UserRequest> {
    return this.http.postJson<UserRequest>('/sign-up', clientSignUp)
      .toPromise()
      .then(response => response.body as UserRequest);
  }

  recoveryClient(clientSignUp: SignUp): Promise<UserRequest> {
    return this.http.postJson<UserRequest>('/sign-recovery', clientSignUp)
      .toPromise()
      .then(response => response.body as UserRequest);
  }

  login(loginRequest: LoginRequest): Promise<UserRequest> {
    return this.http.postJson<UserRequest>('/login', loginRequest)
      .toPromise()
      .then(response => response.body as UserRequest);
  }

  isActual(actualClient: ClientActual): Promise<string> {
    return this.http.postJson<string>('/client-actual', actualClient)
      .toPromise()
      .then(response => response.body);
  }

  logout(currentUser: ClientActual) {
    return this.http.postJson('/logout', currentUser)
      .toPromise()
      .then(response => response.body);
  }
}
