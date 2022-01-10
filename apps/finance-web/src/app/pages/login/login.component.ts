import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthController} from '../../../controller/AuthController';
import {LoginRequest} from '../../../models/auth/LoginRequest';
import {Sign} from "@finance-web/models/Sign/Sign";
import {UserRequest} from "../../../models/client/UserRequest";
import {AuthenticationService} from "../../../services/authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  signForm: FormGroup;

  loginForm: LoginRequest;

  inputFirstModel: Sign;
  inputSecondModel: Sign;

  userReq: UserRequest;

  formTitle: string;
  buttonText: string;
  navigateText: string;
  code: string;
  returnUrl: string;
  errorMessage: string;

  step: number;

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private authController: AuthController
  ) {
    if (this.authService.currentEmployeeValue) {
      this.authService.getIsActual();
    }

    this.subscription = this.route.queryParams.subscribe(res => {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    });
  }

  ngOnInit(): void {
    // localStorage.removeItem('prof_auth');

    this.inputFirstModel = {
      placeholder: "+7(777)777-77-77",
      title: "phone_number",
      typeInput: "text"
    };

    this.inputSecondModel = {
      placeholder: "enter_password",
      title: "password",
      typeInput: "password"
    };

    this.formTitle = "enter_by_login";
    this.buttonText = "sign_in";
    this.navigateText = "register";
    this.code = "login";
    this.step = 0;

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {

    const login: LoginRequest = {
      password: this.signForm.controls['password'].value,
      phoneNumber: this.signForm.controls['username'].value
    };
    this.authController.login(login).then(x => console.log('0YcpDJvCYN :: ', x));

    if (this.signForm.controls['username'].value === 'client') {
      this.router.navigateByUrl('/client').then();
      return;
    }

    if (this.signForm.controls['username'].value === 'admin') {
      if (localStorage.getItem('prof_auth')) {
        this.router.navigate(['admin']).then();
      }

      this.router.navigateByUrl('/admin').then();
      return;
    }

  }

  submitChange(event) {
    this.loginForm = {
      password: event.controls['inputSecond'].value,
      phoneNumber: event.controls['inputFirst'].value
    };

    this.errorMessage = " ";

    this.authService.login(this.loginForm).then(res => {
      if(res.codeResponse.code !== '200') {
        this.errorMessage = res.codeResponse.message;
      }
      else {
        this.errorMessage = "";
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  passwordRecover() {
    this.inputFirstModel = {
      placeholder: "+7(777)777-77-77",
      title: "phone_number",
      typeInput: "text"
    };

    this.inputSecondModel = {
      placeholder: "enter_sms_code",
      title: "sms-code",
      typeInput: "text"
    };

    this.formTitle = "recovery_pass";
    this.buttonText = "proceed";
    this.navigateText = "register";
    this.code = "recovery";
    this.step = 1;
  }
}
