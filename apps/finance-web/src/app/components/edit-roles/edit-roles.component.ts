import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '@finance-web/models/client/UserRole';
import { Dict } from '@finance-web/models/dict/Dict';
import { AdminController } from '@finance-web/controller/AdminController';
import { BankContactController } from '@finance-web/controller/BankContactController';
import { TranslateService } from '@ngx-translate/core';
import { RolesRecord } from '@finance-web/models/roles/RolesRecord';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent implements OnInit {
  titleName: string;
  buttonName: string;
  form: FormGroup;

  roles: Dict[] = [
    { dict: UserRole.ADMIN, displayTitle: 'Администратор' },
    { dict: UserRole.FO_MANAGER, displayTitle: 'Менеджер Финансовой Организации' },
    { dict: UserRole.APPLICATION_MANAGER, displayTitle: 'Менеджер заявок' },
    { dict: UserRole.PRODUCT_MANAGER, displayTitle: 'Менеджер продуктов' },
    { dict: UserRole.NEWS_MANAGER, displayTitle: 'Менеджер новостей' }
  ];

  foNames: Dict[] = [];
  foName: Dict;

  manager: RolesRecord;

  constructor(@Inject(MAT_DIALOG_DATA) public id,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditRolesComponent>,
              private bankContactController: BankContactController,
              private adminController: AdminController,
              private translateService: TranslateService) {
    this.buttonName = this.id == null ? this.translateService.instant('add') : this.translateService.instant('edit');
    this.titleName = this.id == null ? this.translateService.instant('add_title') : this.translateService.instant('edit_title');

    this.form = this.fb.group({
      phoneNumber: ['', Validators.required],
      roles: ['', Validators.required],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: [''],
      foName: [this.foName]
    });
  }

  ngOnInit() {
    this.bankContactController.getFinancialOrganizations().then(x => this.foNames = x);

    if (this.id != null) {
      this.adminController.getManagerDetail(this.id).then(res => {
        this.manager = res;
        this.form.patchValue(this.manager);
      });
    }

  }

  submit() {
    const rolesRecord = this.form.getRawValue() as RolesRecord;
    rolesRecord.clientId = this.id;
    this.adminController.saveManager(rolesRecord);
    this.dialogRef.close();
  }

  closeHandler() {
    this.dialogRef.close(null);
  }
}
