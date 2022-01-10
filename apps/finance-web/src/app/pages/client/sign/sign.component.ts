import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "@finance-web/services/auth.service";
import {Sign} from "@finance-web/models/Sign/Sign";
import {AuthController} from "@finance-web/controller/AuthController";
import {timer} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit, OnChanges {

  @Input() inputFirstModel: Sign;
  @Input() inputSecondModel: Sign;
  @Input() formTitle: string;
  @Input() buttonText: string;
  @Input() navigateText: string;
  @Input() code: string;
  @Input() step: number;
  @Input() errorMsg: string;
  @Input() isSmsSend: boolean;
  isPhoneExists: boolean;
  isSendSmsTimer: boolean = false;

  @Output() formOutput = new EventEmitter<FormGroup>();
  @Output() passwordIsRecovery = new EventEmitter<boolean>();
  @Output() smsSendPhone = new EventEmitter<string>();

  isLogin: boolean = false;
  isRegister: boolean = false;
  isRecovery: boolean = false;

  isStep2: boolean = false;
  isPasswordValidation: boolean = false;

  isMinEightCharacter: boolean = true;
  isMinOneLowCharacter: boolean = true;
  isMinOneUpperCharacter: boolean = true;
  isMinOneNumber: boolean = true;
  isMinOneSpecialCharacter: boolean = true;

  isShowPasswordFirst: boolean = false;
  isShowPasswordSecond: boolean = false;

  signForm: FormGroup;

  time: Date;
  limitSeconds = 60;
  remainingTime$: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private authController: AuthController
  ) {
  }

  ngOnInit(): void {

    this.time = new Date();

    localStorage.removeItem('prof_auth');

    this.isStep2 = this.step === 2;

    if (this.code === 'login') {
      this.isLogin = true;
      this.isRegister = false;
      this.isRecovery = false;

    } else if (this.code === 'registration') {
      this.isLogin = false;
      this.isRecovery = false;
      this.isRegister = true;
    } else if (this.code === 'recovery') {
      this.isLogin = false;
      this.isRecovery = true;
      this.isRegister = false;
    }

    if (!this.isSmsSend) {
      this.isSmsSend = false;
    }

    this.newForm(11);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.errorMsg = !this.errorMsg ? '' : this.errorMsg;

    if (this.errorMsg.length === 0) {
      this.remainingTime$ = null;

      this.isSmsSend = false;
      this.isLogin = false;
      this.isRegister = false;
      this.isRecovery = false;
      if (this.code === 'recovery') {
        this.isLogin = false;
        this.isRegister = false;
        this.isRecovery = true;
      }
      this.newForm(1);
      this.signForm.get('inputFirst').setValidators([Validators.pattern(new RegExp('^.{8,}$')),
        Validators.pattern(new RegExp('^(?=.*?[A-Z])')),
        Validators.pattern(new RegExp('^(?=(.*[a-z]){1,})')),
        Validators.pattern(new RegExp('^(?=(.*[\\d]){1,})')),
        Validators.pattern(new RegExp('^(?=.*?[@./!()_,#$%^&+=-])'))
      ]);
      this.isStep2 = this.step === 2;
    }
  }

  onSubmit() {
    if (this.code === 'registration' || this.code === 'recovery') {
      this.signForm.get('inputFirst').setValue(this.signForm.controls['inputFirst'].value);
    }
    if (!this.signForm.valid || this.errorMsg.length !== 0) {
      return;
    }
    this.formOutput.emit(this.signForm);
  }

  passwordRecovery() {
    this.isRecovery = true;
    this.isLogin = false;
    this.isRegister = false;
    this.passwordIsRecovery.emit(this.isRecovery);

    this.router.navigateByUrl('/recovery').then();
  }

  pageChanger() {

    if (this.code === 'login' || this.code === 'recovery') {
      this.router.navigateByUrl('/registration').then();
    } else if (this.code === 'registration' || this.code === 'pick a password') {
      this.router.navigateByUrl('/login').then();
    }

    this.newForm(11);
  }

  newForm(firstInputLength: number) {
    this.signForm = this.fb.group({
      inputFirst: ['', Validators.minLength(firstInputLength)],
      inputSecond: ['', Validators.required]
    });
  }

  disable() {
    if ((this.isRegister || this.isRecovery || this.isLogin) && this.firstInput.value?.length !== 11) {
      return true;
    }
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
    if (this.errorMsg.length > 0) {
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
    this.smsSendPhone.emit(this.signForm.controls['inputFirst'].value);
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
    if ((this.isRegister || this.isRecovery) && this.errorMsg.length !== 0) {
      return;
    }
    this.errorMsg = "";
  }

  get firstInput() {
    return this.signForm.get('inputFirst');
  }

  get secondInput() {
    return this.signForm.get('inputSecond');
  }

  showPasswordSecond() {
    this.isShowPasswordSecond = !this.isShowPasswordSecond;
    if (this.isShowPasswordSecond) {
      this.inputSecondModel.typeInput = 'text';
    } else {
      this.inputSecondModel.typeInput = 'password';
    }
  }

  showPasswordFirst() {
    this.isShowPasswordFirst = !this.isShowPasswordFirst;
    if (this.isShowPasswordFirst) {
      this.inputFirstModel.typeInput = 'text';
    } else {
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
