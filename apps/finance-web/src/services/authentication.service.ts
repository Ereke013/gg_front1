import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenService} from '@finance-web/services/token.service';
import {AuthController} from "@finance-web/controller/AuthController";
import {LoginRequest} from "@finance-web/models/auth/LoginRequest";
import {Router} from "@angular/router";
import {SignUp} from "@finance-web/models/Sign/SignUp";
import {UserRequest} from "@finance-web/models/client/UserRequest";
import {ClientActual} from "@finance-web/models/client/ClientActual";
import {UserRole} from "@finance-web/models/client/UserRole";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentEmployeeSubject: BehaviorSubject<UserRequest | null>;
  currentEmployee: Observable<UserRequest | null>;

  constructor(private tokenService: TokenService, private authController: AuthController, private router: Router) {
    const item = this.getSession();
    this.currentEmployeeSubject = new BehaviorSubject<UserRequest | null>(JSON.parse(localStorage.getItem('auth')) as UserRequest);
    this.currentEmployee = this.currentEmployeeSubject.asObservable();
  }

  get currentEmployeeValue(): UserRequest | null {
    return this.currentEmployeeSubject?.value;
  }

  updateCurrentEmployee(employee: UserRequest) {
    this.authenticate(employee);
  }

  login(loginForm: LoginRequest) {
    return this.authController.login(loginForm).then(res => {
      if(res.codeResponse.code === '200'){
        this.setClientInfo(res);
      }
      return res;
    });
  }

  register(signUpForm: SignUp) {
    return this.authController.signUpClient(signUpForm).then(res => {
      this.setClientInfo(res);
      return res;
    });
  }

  private setClientInfo(res: UserRequest) {
    localStorage.setItem('auth', JSON.stringify(res));
    this.currentEmployeeSubject.next(res);
    this.setSession(res.tokenId);
  }

  recovery(signUpForm: SignUp) {
    return this.authController.recoveryClient(signUpForm).then(res => {
      this.setClientInfo(res);
      return res;
    });
  }

  authenticate(employee: UserRequest) {
    // store employee details and jwt token in session storage to keep employee logged in between page refreshes
    this.setSession(employee.tokenId);
    this.currentEmployeeSubject.next(employee);
  }

  logout() {
    // remove employee from session storage and set current employee to null
    const currentUser: ClientActual = {
      id: this.currentEmployeeValue?.id,
      token: this.currentEmployeeValue?.tokenId
    };
    this.authController.logout(currentUser).then(res => {
      this.setSession(null);
      localStorage.removeItem('auth');
      this.currentEmployeeSubject.next(null);
      this.router.navigateByUrl('/login').then();
    });

  }

  setSession(token: string) {
    this.tokenService.writeToken(token);
  }

  private getSession() {
    return this.tokenService.tokenValue;
  }

  getIsActual() {
    const currentUser: ClientActual = {
      id: this.currentEmployeeValue?.id,
      token: this.currentEmployeeValue?.tokenId
    };
    this.authController.isActual(currentUser).then(res => {
      if (res === 'ACTUAL') {
        this.router.navigate(['/client']);
      } else {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login').then();
      }
    });
  }

  getIsAdmin() {
    if(this.currentEmployeeValue?.roles.includes(UserRole.ADMIN)){
      return true;
    }
    return false;
  }
}
