import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileController} from "@finance-web/controller/ProfileController";
import {UserChangePassword} from "@finance-web/models/profile/UserChangePassword";

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {

  formPassword: FormGroup;
  isValidation: boolean = false;
  isNotEqual: boolean = false;

  message: string;
  isError: boolean = false;
  isSuccess: boolean = false;

  isMinEightCharacter: boolean = true;
  isMinOneLowCharacter: boolean = true;
  isMinOneUpperCharacter: boolean = true;
  isMinOneNumber: boolean = true;
  isMinOneSpecialCharacter: boolean = true;

  constructor(private fb: FormBuilder,
              private profileController: ProfileController) {
    this.isError = false;
    this.isSuccess = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  change() {
    const oldPassword = this.formPassword.controls['oldPassword'].value;
    const newPassword = this.formPassword.controls['newPassword'].value;
    const repeatPassword = this.formPassword.controls['repeatNewPassword'].value;

    const pattern = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$');

    this.isMinEightCharacter = !new RegExp('^.{8,}$').test(this.firstInput.value);
    this.isMinOneNumber = !new RegExp('^(?=(.*[\\d]){1,})').test(this.firstInput.value);
    this.isMinOneUpperCharacter = !new RegExp('^(?=.*?[A-Z])').test(this.firstInput.value);
    this.isMinOneLowCharacter = !new RegExp('^(?=(.*[a-z]){1,})').test(this.firstInput.value);
    this.isMinOneSpecialCharacter = !new RegExp('^(?=.*?[@./!()_,#$%^&+=-])').test(this.firstInput.value);

    this.isValidation = !pattern.test(newPassword);

    this.isNotEqual = repeatPassword && repeatPassword.length > 2 && (repeatPassword !== newPassword);

  }

  onValidate() {
    return !this.formPassword.valid && (this.formPassword.controls['newPassword'].value !== this.formPassword.controls['repeatNewPassword'].value);
  }

  changePass() {
    if (this.formPassword.valid) {
      const passwordChange: UserChangePassword = {
        newPassword: this.formPassword.controls['newPassword'].value,
        oldPassword: this.formPassword.controls['oldPassword'].value,
        repeatNewPassword: this.formPassword.controls['repeatNewPassword'].value
      };
      this.profileController.changePassword(passwordChange).then(res => {
        this.message = res;
        if (this.message?.trim().length === 0) {
          this.isError = false;
          this.isSuccess = true;
          this.message = "Success";
          this.initForm();
        }else {
          this.isError = true;
          this.isSuccess = false;
        }
      });
    }
  }

  initForm() {
    this.formPassword = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8),
                         Validators.pattern(new RegExp('^.{8,}$')),
                         Validators.pattern(new RegExp('^(?=.*?[A-Z])')),
                         Validators.pattern(new RegExp('^(?=(.*[a-z]){1,})')),
                         Validators.pattern(new RegExp('^(?=(.*[\\d]){1,})')),
                         Validators.pattern(new RegExp('^(?=.*?[@./!()_,#$%^&+=-])'))]],
      repeatNewPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get firstInput() {
    return this.formPassword.get('newPassword');
  }
}
