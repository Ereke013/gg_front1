import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Sign} from "../../../../models/Sign/Sign";
import {AuthController} from "../../../../controller/AuthController";
import {SmsVerification} from "../../../../models/Sign/SmsVerification";
import {SignUp} from "../../../../models/Sign/SignUp";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  inputFirstModel: Sign;
  inputSecondModel: Sign;

  signUpForm: SignUp = {
    password: "",
    phoneNumber: "",
    confirmPassword: ""
  };

  smsVer: SmsVerification;

  formTitle: string;
  buttonText: string;
  navigateText: string;
  code: string;
  errorMessage: string;
  returnUrl: string;

  isSmsSend: boolean;

  step: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private authController: AuthController
  ) {
    if (this.authService.currentEmployeeValue) {
      this.authService.getIsActual();
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('prof_auth');

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

    this.formTitle = "registration";
    this.buttonText = "proceed";
    this.navigateText = "sign_in";
    this.code = "registration";
    this.step = 1;
    this.errorMessage = '';
    this.isSmsSend = false;

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  smsSender(event) {
    if (event) {
      this.authController.smsSend(event).then();
    }
  }

  submitChange(event) {


    this.errorMessage = ' ';
    this.smsVer = {
      phoneNumber: event.controls['inputFirst'].value,
      smsCode: event.controls['inputSecond'].value
    };

    if (this.code === 'registration') {
      this.authController.checkSms(this.smsVer).then(res => {
        if (res.trim().length === 0) {

          this.signUpForm.phoneNumber = this.smsVer.phoneNumber;

          this.inputFirstModel = {
            placeholder: "pick_a_password",
            title: "password",
            typeInput: "password"
          };

          this.inputSecondModel = {
            placeholder: "repeat_password",
            title: "confirm_password",
            typeInput: "password"
          };

          this.formTitle = "registration";
          this.buttonText = "register";
          this.navigateText = "sign_in";
          this.code = "pick a password";
          this.step = 2;
          this.errorMessage = '';
        }

        this.errorMessage = "";
        this.errorMessage = res;
      });
    } else if (this.code === 'pick a password') {
      this.signUpForm.password = this.smsVer.phoneNumber;
      this.signUpForm.confirmPassword = this.smsVer.smsCode;
      this.authService.register(this.signUpForm).then(res => {
        this.router.navigate([this.returnUrl]);
      });
    }
  }
}
