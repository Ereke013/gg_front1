import {Component, Inject, OnInit} from '@angular/core';
import {BankProductToSave} from '@finance-web/models/bank_product/BankProductToSave';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {BankContactController} from '@finance-web/controller/BankContactController';
import {FileInfo} from '@finance-web/models/file/FileInfo';
import {Dict} from '@finance-web/models/dict/Dict';
import {BankBranch} from '@finance-web/models/bank_product/BankBranch';
import {CreditConsumerController} from "@finance-web/controller/CreditConsumerController";
import {ClientLocation} from "@finance-web/models/location/ClientLocation";

@Component({
  selector: 'app-edit-bank-contacts',
  templateUrl: './edit-bank-contacts.component.html',
  styleUrls: ['./edit-bank-contacts.component.scss']
})
export class EditBankContactsComponent implements OnInit {

  buttonName: any;
  titleName: any;

  bankContact: BankProductToSave;
  bankContactReturn: BankProductToSave;
  form: FormGroup;

  fileInfo: FileInfo;

  financialOrganizations: Dict[] = [];
  cities: ClientLocation[];

  bankContacts: FormArray;
  isSortBox: boolean = true;

  constructor(private dialogRef: MatDialogRef<EditBankContactsComponent>,
              @Inject(MAT_DIALOG_DATA) private id,
              private fb: FormBuilder,
              private translateService: TranslateService,
              private bankContactController: BankContactController,
              private creditConsumer: CreditConsumerController
  ) {
    this.form = this.fb.group({
      title: [''],
      bankCode: [''],
      branches: this.fb.array([]),
      logo: [],
      siteUrl: [''],
      isCooperation: [false]
    });
    this.buttonName = id == null ? this.translateService.instant('add') : this.translateService.instant('edit');
    this.titleName = id == null ? this.translateService.instant('add_title') : this.translateService.instant('edit_title');
  }

  async ngOnInit() {

    await this.bankContactController.getFinancialOrganizations().then(x => {
      this.financialOrganizations = x;
    });
    this.creditConsumer.getLocations().then(x => this.cities = x);

    if (this.id != null) {

      await this.bankContactController.getBankContactDetail(this.id).then(res => {
        this.bankContact = res;
        this.form.get('title').setValue(res.title);
        this.form.get('bankCode').setValue(res.bankCode);
        this.form.get('logo').setValue(res.logo);
        this.form.get('siteUrl').setValue(res.siteUrl);
        this.form.get('isCooperation').setValue(res.isCooperation);
        for (let i = 0; i < res.branches.length; i++) {
          this.addBankContact(res.branches[i]);
        }
      });
    }

  }

  get contacts(): FormArray {
    return <FormArray>this.form.get('branches');
  }

  createItem(branch?: BankBranch): FormGroup {
    if (branch) {
      return this.fb.group({
        address: branch.address,
        phone: branch.phone,
        id: branch.id,
        city: branch.city,
        bankCode: branch.bankCode
      });
    }
    return this.fb.group({
      address: '',
      phone: '',
      id: '',
      city: '',
      bankCode: ''
    });
  }

  addBankContact(branch?: BankBranch) {
    this.bankContacts = this.form.get('branches') as FormArray;
    this.bankContacts.push(this.createItem(branch));
  }

  removeBankContact(index: number) {
    if (!this.bankContact) {
      this.bankContacts.removeAt(index);
    } else if (this.bankContact?.branches[index].id) {
      this.bankContactController.deleteBranch(this.bankContact.branches[index].id).then(() => {
        this.bankContacts.removeAt(index);
        this.form.get('branches').setValue([]);
        for (let i = 0; i < this.bankContacts.length; i++) {
          this.addBankContact(this.bankContacts[i]);
        }
      });
    } else {
      this.form.get('branches').setValue(this.bankContact?.branches);
      this.bankContacts.removeAt(index);
      this.form.get('branches').setValue([]);
      for (let i = 0; i < this.bankContacts.length; i++) {
        this.addBankContact(this.bankContacts[i]);
      }
    }

  }

  async submit() {
    this.bankContactReturn = this.form.getRawValue();

    if (!this.bankContact || !this.bankContact.logo) {
      await this.bankContactController.saveFileId(this.fileInfo).then(x => this.bankContactReturn.logo = x);
    }

    if (this.id != null) {
      this.bankContactReturn.bankCode = this.id;
    }

    this.bankContactReturn.title = this.financialOrganizations.filter(x => x.dict === this.bankContactReturn.bankCode)[0].displayTitle;

    this.dialogRef.close(this.bankContactReturn);

  }

  closeHandler() {
    this.dialogRef.close(null);
  }

  onFileChanged(event: any) {
    const reader = new FileReader();
    const fileInfo: FileInfo = {} as FileInfo;
    fileInfo.size = event.target.files[0].size;
    fileInfo.mimeType = event.target.files[0].type;
    fileInfo.name = event.target.files[0].name;
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (ev: any) => {
      fileInfo.base64data = ev.target.result.split(',')[1];
      this.fileInfo = fileInfo;
    };
  }

  deleteBankIcon() {
    if (this.id !== null) {
      this.bankContactController.deleteBankIcon(this.id).then(res => {
        this.bankContact.logo = "";
      });
    }
  }
}
