import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Sign} from "@finance-web/models/Sign/Sign";
import {AuthService} from "@finance-web/services/auth.service";
import {AuthController} from "@finance-web/controller/AuthController";
import {AuthenticationService} from "@finance-web/services/authentication.service";
import {LoginRequest} from "@finance-web/models/auth/LoginRequest";
import {SmsVerification} from "@finance-web/models/Sign/SmsVerification";
import {SignUp} from "@finance-web/models/Sign/SignUp";
import {timer} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-dialog-auth-client',
  templateUrl: './dialog-auth-client.component.html',
  styleUrls: ['./dialog-auth-client.component.scss']
})
export class DialogAuthClientComponent implements OnInit {
  loginForm: LoginRequest;

  inputFirstModel: Sign;
  inputSecondModel: Sign;

  formTitle: string;
  buttonText: string;
  navigateText: string;
  code: string;
  errorMsg: string;

  isSmsSend: boolean = false;
  isPhoneExists: boolean;
  isLogin: boolean = false;
  isRegister: boolean = false;
  isRecovery: boolean = false;
  isPickPassword: boolean = false;
  isPickRecoveryPassword: boolean = false;

  step: boolean = false;
  isStep2: boolean = false;
  isPasswordValidation: boolean = false;

  isShowPasswordFirst: boolean = false;
  isShowPasswordSecond: boolean = false;

  isMinEightCharacter: boolean = true;
  isMinOneLowCharacter: boolean = true;
  isMinOneUpperCharacter: boolean = true;
  isMinOneNumber: boolean = true;
  isMinOneSpecialCharacter: boolean = true;

  signForm: FormGroup;

  signUpForm: SignUp = {
    password: "",
    phoneNumber: "",
    confirmPassword: ""
  };

  time: Date;
  limitSeconds = 60;
  remainingTime$: any;

  constructor(private dialogRef: MatDialogRef<DialogAuthClientComponent>,
              private fb: FormBuilder,
              private authService: AuthService,
              private authenticationService: AuthenticationService,
              private authController: AuthController) {
  }

  ngOnInit(): void {
    localStorage.removeItem('prof_auth');
    this.loginInitForm();
    this.time = new Date();
  }

  onSubmit() {
    if(this.errorMsg.length !== 0){
      return;
    }

    if (this.code === 'registration' || this.code === 'recovery') {
      this.signForm.get('inputFirst').setValue(this.signForm.controls['inputFirst'].value);
    } else if (this.code === 'login' && this.firstInput.valid && this.secondInput.valid) {
      this.setLoginForm();
    }
    if (this.isRegister || this.isPickPassword || this.isRecovery || this.isPickRecoveryPassword) {
      this.setRegistrationSmsPass();
    }
  }

  passwordRecovery() {
    this.isRecovery = true;
    this.isLogin = false;
    this.isRegister = false;
    this.recoveryForm();
  }

  pageChanger() {

    if (this.code === 'login' || this.code === 'recovery') {
      this.registrationForm();
    } else if (this.code === 'registration' || this.code === 'pick a password') {
      this.loginInitForm();
    }

    this.remainingTime$ = null;

    this.newForm(11);
  }

  registrationForm() {
    this.isLogin = false;
    this.isRecovery = false;
    this.isRegister = true;

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
    this.step = true;
    this.isStep2 = true;
    this.errorMsg = '';
    this.isSmsSend = false;

    this.newForm(11);
  }

  setRegistrationSmsPass() {
    if(!this.signForm.valid || !this.firstInput.valid || !this.secondInput.valid){
      return;
    }

    if (this.code === 'registration' || this.code === 'recovery') {
      const smsVer: SmsVerification = {
        phoneNumber: this.firstInput.value,
        smsCode: this.secondInput.value
      };

      this.signUpForm.phoneNumber = smsVer.phoneNumber;


      this.authController.checkSms(smsVer).then(res => {
        if (res.trim().length === 0) {
          this.remainingTime$ = null;

          this.isSmsSend = false;
          this.isRegister = false;
          this.isRecovery = false;
          this.isLogin = false;

          if (this.code === 'recovery') {
            this.isPickRecoveryPassword = true;
          } else if (this.code === 'registration') {
            this.isPickPassword = true;
          }

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

          this.formTitle = this.code === 'recovery' ? "recovery_pass" : "registration";
          this.buttonText = this.code === 'recovery' ? "restore" : "register";
          this.navigateText = this.code === 'recovery' ? "register" : "sign_in";
          this.code = "pick a password";
          this.isStep2 = true;
          this.errorMsg = '';

          this.newForm(1);
          this.signForm.get('inputFirst').setValidators([Validators.pattern(new RegExp('^.{8,}$')),
            Validators.pattern(new RegExp('^(?=.*?[A-Z])')),
            Validators.pattern(new RegExp('^(?=(.*[a-z]){1,})')),
            Validators.pattern(new RegExp('^(?=(.*[\\d]){1,})')),
            Validators.pattern(new RegExp('^(?=.*?[@./!()_,#$%^&+=-])'))
          ]);
        }

        this.errorMsg = "";
        this.errorMsg = res;
      });

    } else if (this.code === 'pick a password' && this.isPickPassword) {
      this.signUpForm.password = this.firstInput.value;
      this.signUpForm.confirmPassword = this.secondInput.value;
      this.authenticationService.register(this.signUpForm).then(res => {
        this.dialogRef.close("success");
      });
    } else if (this.code === 'pick a password' && this.isPickRecoveryPassword) {
      this.signUpForm.password = this.firstInput.value;
      this.signUpForm.confirmPassword = this.secondInput.value;
      this.authenticationService.recovery(this.signUpForm).then(res => {
        this.dialogRef.close("success");
      });
    }
  }

  setLoginForm() {
    if (this.isLogin) {
      this.loginForm = {
        phoneNumber: this.firstInput.value,
        password: this.secondInput.value
      };
      this.authenticationService.login(this.loginForm).then(res => {
        if (res.codeResponse.code !== '200') {
          this.errorMsg = res.codeResponse.message;
        } else {
          this.errorMsg = "";
          this.dialogRef.close("success");
        }
      });
    }
  }

  loginInitForm() {
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

    this.code = "login";

    this.isLogin = true;
    this.isRegister = false;
    this.isRecovery = false;
    this.isStep2 = false;
    this.step = false;

    this.newForm(11);
  }

  recoveryForm() {
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
    this.step = true;
    this.isStep2 = false;
    this.errorMsg = '';
    this.isSmsSend = false;

    this.newForm(11);
  }

  newForm(firstInputLength: number) {
    this.signForm = this.fb.group({
      inputFirst: ['', Validators.minLength(firstInputLength)],
      inputSecond: ['', Validators.required]
    });
  }

  disable() {
    if (this.code === 'pick a password') {
      this.isMinEightCharacter = !new RegExp('^.{8,}$').test(this.firstInput.value);
      this.isMinOneNumber = !new RegExp('^(?=(.*[\\d]){1,})').test(this.firstInput.value);
      this.isMinOneUpperCharacter = !new RegExp('^(?=.*?[A-Z])').test(this.firstInput.value);
      this.isMinOneLowCharacter = !new RegExp('^(?=(.*[a-z]){1,})').test(this.firstInput.value);
      this.isMinOneSpecialCharacter = !new RegExp('^(?=.*?[@./!()_,#$%^&+=-])').test(this.firstInput.value);

      if (!this.firstInput.valid) {
        return true;
      }

      if ((this.signForm.controls['inputFirst'].value !== this.signForm.controls['inputSecond'].value)) {
        return true;
      } else if (!this.signForm.valid) {
        return true;
      }
    }
    if (this.errorMsg?.length > 0) {
      return true;
    }

    return !this.signForm.valid;
  }

  modelChange(event: any) {
    this.errorMsg = "";
    this.isSmsSend = false;

    if ((this.code === 'registration' || this.code === 'recovery') && event && event.length === 11) {
      if (this.code === 'registration') {
        this.authController.checkPhoneExists(event).then(res => {
          this.isPhoneExists = res;
          this.isSmsSend = !this.isPhoneExists;
          if (this.isPhoneExists) {
            this.errorMsg = "Такой номер телефона уже существует";
          }
        });
      } else if (this.code === 'recovery') {
        this.authController.checkRecoveryPhoneExists(event).then(res => {
          this.isPhoneExists = res;
          this.isSmsSend = !this.isPhoneExists;
          if (this.isPhoneExists) {
            this.errorMsg = "Такой номер телефона не существует";
          }
        });
      } else {
        this.isSmsSend = false;
      }
    }
  }

  sendSms() {
    this.authController.smsSend(this.firstInput.value).then();

    this.time = new Date();
    this.remainingTime$ = this.createTimer();
  }

  modelChangeSecond() {
    if (this.code === 'pick a password') {
      if ((this.signForm.controls['inputFirst'].value !== this.signForm.controls['inputSecond'].value)) {
        this.errorMsg = "Пароли не совпадают";
        return;
      }
    }
    this.errorMsg = "";
  }

  get firstInput() {
    return this.signForm.get('inputFirst');
  }

  get secondInput() {
    return this.signForm.get('inputSecond');
  }

  close() {
    this.dialogRef.close();
  }

  showPasswordSecond() {
    this.isShowPasswordSecond = !this.isShowPasswordSecond;
    if (this.isShowPasswordSecond) {
      this.inputSecondModel.typeInput = 'text';
    }
    else {
      this.inputSecondModel.typeInput = 'password';
    }
  }

  showPasswordFirst() {
    this.isShowPasswordFirst = !this.isShowPasswordFirst;
    if (this.isShowPasswordFirst) {
      this.inputFirstModel.typeInput = 'text';
    }
    else {
      this.inputFirstModel.typeInput = 'password';
    }
  }

  createTimer() {
    this.isSmsSend = false;
    return timer(0, 1000).pipe(map(value => {
      const t1: Date = new Date();
      const dif = Math.floor((t1.getTime() - this.time.getTime()) / 1000);
      const time = this.limitSeconds - dif;
      if(time <= 0){
        this.isSmsSend = true;
        return 0;
      }
      return time;
    }));
  }
}
