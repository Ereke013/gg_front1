import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DictToSaveValue} from "@finance-web/models/dict/DictToSaveValue";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AdminController} from "@finance-web/controller/AdminController";
import {Dict} from "@finance-web/models/dict/Dict";

@Component({
  selector: 'app-edit-dict-value',
  templateUrl: './edit-dict-value.component.html',
  styleUrls: ['./edit-dict-value.component.scss']
})
export class EditDictValueComponent implements OnInit, OnChanges {

  @Input() data: any;

  @Output() closing = new EventEmitter<boolean>();
  @Output() savingData = new EventEmitter<DictToSaveValue>();

  buttonName: any;
  titleName: any;

  dictValue: DictToSaveValue;
  dictValueReturn: DictToSaveValue;
  dictForSelect: Dict[];

  dictValueForm: FormGroup;

  dragPosition = {};

  constructor(private fb: FormBuilder,
              private translateService: TranslateService,
              private adminController: AdminController) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.redefindType();
  }

  submit() {
    this.dictValueReturn = this.dictValueForm.getRawValue();

    if (!isNaN(+this.data)) {
      this.dictValueReturn.id = this.data;
    }

    this.savingData.emit(this.dictValueReturn);
  }

  closeHandler() {
    this.closing.emit(true);
  }

  redefindType() {
    if (!isNaN(+this.data)) {
      this.buttonName = this.translateService.instant('edit');
      this.titleName = this.translateService.instant('edit_title');
    } else {
      this.buttonName = this.translateService.instant('add');
      this.titleName = this.translateService.instant('add_title');
    }

    this.dictValueForm = this.fb.group({
      dict: [""],
      dictCodeColumn: ["", Validators.required],
      dictTitleColumnRu: ["", Validators.required],
      dictTitleColumnEn: [""],
      dictTitleColumnKk: [""],
    });

    this.dragPosition = {x: 200, y: -736};

    this.adminController.getDictList().then(res => {
      this.dictForSelect = res;
    });
    this.dictValueForm.controls.dict.disable();

    if (!isNaN(+this.data)) {

      this.adminController.getDictValueDetail(this.data).then(res => {
        this.dictValue = res;

        this.dictValueForm.patchValue(this.dictValue);
      });

    } else {
      this.dictValueForm.controls.dict.setValue(this.data);
    }
  }
}
