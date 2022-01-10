import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Dict} from '../../../models/dict/Dict';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogCreditHistoryComponent} from "@finance-web/app/components/dialog-credit-history/dialog-credit-history.component";
import {AdditionCredit} from "@finance-web/models/credit_history/AdditionCredit";
import {AdminController} from "@finance-web/controller/AdminController";
import {AuthenticationService} from "@finance-web/services/authentication.service";
import {DeleteDialogWindowComponent} from "@finance-web/app/components/delete-dialog-window/delete-dialog-window.component";
import {DICT_TABLE, DICT_VALUE_TABLE} from "@finance-web/app/shares/common-const";
import {deleteRecordFromTable} from "@finance-web/app/shares/util-method";

@Component({
  selector: 'app-dynamic-dict-credit-select',
  templateUrl: './dynamic-dict-credit-select.component.html',
  styleUrls: ['./dynamic-dict-credit-select.component.scss']
})
export class DynamicDictCreditSelectComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControl: AbstractControl;
  @Input() dictList: Dict[];
  @Input() prefixDictList: Dict[];

  @Output() filterType = new EventEmitter<string>();

  dicts = new FormControl('');
  insertedHistory: string[] = [];

  isAddNewCreditHistory: boolean = false;

  newCreditHistory: AdditionCredit;

  constructor(private dialog: MatDialog,
              private adminController: AdminController,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    const formControlValue = this.formControl?.value;

    if (formControlValue) {

      const arrDictValues: string[] = [];

      for (const dictSel of this.formControl.value.split(',')) {
        arrDictValues.push(dictSel);
      }

      this.dicts.setValue(arrDictValues);
    }
    this.isAddNewCreditHistory = this.authService.getIsAdmin();
  }

  selectChanged() {
    this.formControl.setValue('');

    let selectedStr = '';
    for (const sel of this.dicts.value) {
      selectedStr += sel + ',';
    }
    for (const sel of this.insertedHistory) {
      selectedStr += sel + ',';
    }

    selectedStr = selectedStr.slice(0, -1);
    this.formControl.setValue(selectedStr);

    this.filterType.emit(this.formControl.value);
  }

  addYourselfCreditHistory() {
    const data = {
      dictList: this.prefixDictList,
      creditHistory: this.newCreditHistory
    };
    const dialogRef = this.dialog.open(DialogCreditHistoryComponent, {
      restoreFocus: false,
      width: '50vw',
      panelClass: 'credit-history-dialog',
      data: data,
      minHeight: '20vh'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newCreditHistory = res;
        this.adminController.saveAdditionCredit(this.newCreditHistory).then(res => {
          if (res && res !== '-1') {
            this.insertedHistory.push(res);
            this.selectChanged();
          }
        });
      }
    });
  }

  deleteKI(dict: string) {
    if (Number(dict) && this.isAddNewCreditHistory) {
      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(DeleteDialogWindowComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        if (data && data === true) {
          this.adminController.deleteCreditHistory(Number(dict)).then(r => {
            const idx2 = this.dictList.findIndex(x => x.dict === dict);
            this.dictList.splice(idx2, 1);
          });
        }
      });

    }
  }
}
