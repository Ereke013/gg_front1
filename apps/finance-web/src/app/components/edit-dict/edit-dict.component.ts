import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AdminController} from "@finance-web/controller/AdminController";
import {DictToSave} from "@finance-web/models/dict/DictToSave";
import {Dict} from "@finance-web/models/dict/Dict";

@Component({
  selector: 'app-edit-dict',
  templateUrl: './edit-dict.component.html',
  styleUrls: ['./edit-dict.component.scss']
})
export class EditDictComponent implements OnInit {

  buttonName: any;
  titleName: any;

  dict: DictToSave;
  dictReturn: DictToSave;

  dictForm: FormGroup;
  dictListToCheck: Dict[];
  isCodeUnique: boolean = true;
  isCodeEmpty: boolean = false;

  constructor(private dialogRef: MatDialogRef<EditDictComponent>,
              @Inject(MAT_DIALOG_DATA) private id,
              private fb: FormBuilder,
              private translateService: TranslateService,
              private adminController: AdminController) {

    this.dictForm = this.fb.group({
      dict: new FormControl("", [Validators.required, this.uniqueDictCode()]),
      displayTitleEn: new FormControl(""),
      displayTitleRu: new FormControl("", Validators.required),
      displayTitleKk: new FormControl(""),
    });

    this.buttonName = id == null ? this.translateService.instant('add') : this.translateService.instant('edit');
    this.titleName = id == null ? this.translateService.instant('add_title') : this.translateService.instant('edit_title');
  }

  ngOnInit(): void {

    this.adminController.getDictList().then(res => {
      this.dictListToCheck = res;
    });

    if (this.id != null) {

      this.adminController.getDictDetail(this.id).then(res => {
        this.dict = res;

        this.dictForm.patchValue(this.dict);
      })

      this.dictForm?.controls?.dict.disable();
      this.dictForm?.controls?.dict.clearValidators();
      this.dictForm?.controls?.dict.clearAsyncValidators();
      this.isCodeEmpty = false;
      this.isCodeUnique = true;
    }
  }

  uniqueDictCode(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      this.controlDictUnique() ? null : {wrongColor: control.value};
  }

  submit() {
    this.dictReturn = this.dictForm.getRawValue();

    if (this.id != null) {
      this.dictReturn.dict = this.id;
    }
    this.dialogRef.close(this.dictReturn);
  }

  closeHandler() {
    this.dialogRef.close(null);
  }

  controlDictUnique(): boolean {

    if (this.dictForm?.controls?.dict.value == null || this.dictForm?.controls?.dict.value.length === 0) {
      this.isCodeUnique = true;
      this.isCodeEmpty = true;
      return false;
    }

    this.isCodeEmpty = false;

    let dict = this.dictListToCheck.find(d => d.dict === this.dictForm?.controls?.dict.value);
    this.isCodeUnique = dict == null;

    return this.isCodeUnique;
  }
}
