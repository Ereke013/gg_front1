import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {AuthController} from "@finance-web/controller/AuthController";
import {UserRequest} from "@finance-web/models/client/UserRequest";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  signForm: UserRequest;

  constructor(private authController: AuthController, private router: Router) {
    const token = localStorage.getItem('prof_auth');
    this._isLoggedIn.next(!!token);
  }

  login(loginForm: UserRequest) {

    if (loginForm) {
      localStorage.setItem('auth', JSON.stringify(loginForm));
      this.router.navigateByUrl("/client");
    }
    return this._isLoggedIn.next(false);
  }

  logout() {
    localStorage.removeItem('prof_auth');
  }

  isAuthenticated() {
    this.signForm = JSON.parse(localStorage.getItem('auth'));
    return (this.signForm && this.signForm.tokenId.length > 10);
  }

  getToken(){
    return localStorage.getItem('auth');
  }

}
