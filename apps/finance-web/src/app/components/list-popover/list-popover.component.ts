import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CheckBoxElement} from "@finance-web/models/help/CheckBoxElement";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {CheckBoxRecord} from "@finance-web/models/help/CheckBoxRecord";

@Component({
  selector: 'app-list-popover',
  templateUrl: './list-popover.component.html',
  styleUrls: ['./list-popover.component.scss']
})

export class ListPopoverComponent implements OnInit {

  @Input()
  public set setInputElements(inputElements: CheckBoxRecord[]) {
    if (!inputElements) {
      return;
    }
    this.inputElements = inputElements;
  }

  inputElements: CheckBoxRecord[];

  @Output() checkedElements = new EventEmitter<CheckBoxElement>();
  @Output() closePopOver = new EventEmitter<boolean>();

  form: FormGroup;

  isMore: boolean;
  checkedBoxes = 0;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.elementFormArray.clear();
      this.checkedBoxes = 0;
      this.addCheckboxes();
    }
  }

  constructor(private fb: FormBuilder,
              private eRef: ElementRef) {
  }

  get elementFormArray() {
    return this.form.controls.elements as FormArray;
  }

  ngOnInit(): void {
    this.closePopOver.emit(false);
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      elements: new FormArray([])
    });
  }

  private addCheckboxes() {
    if(this.inputElements){
      for (let inp of this.inputElements) {
        this.elementFormArray.push(new FormControl(inp.isChecked));
        if (inp.isChecked) {
          this.checkedBoxes++;
        }
      }
    }

  }

  submit() {
    const selectedElementsIds = this.form.value.elements
      .map((checked, i) => checked ? this.inputElements[i].id : null)
      .filter(v => v !== null);

    let records: CheckBoxRecord[] = [];

    for (let selectedId of selectedElementsIds) {

      let checkedRecord = this.inputElements.find(input => input.id == selectedId);

      records.push({
        id: checkedRecord.id,
        title: checkedRecord.title,
        isChecked: true,
        tableName: checkedRecord.tableName,
        parameterType: checkedRecord.parameterType,
      });
    }

    let checkBoxElement: CheckBoxElement = {
      records: records
    };

    this.checkedElements.emit(checkBoxElement);
    this.updateInputElements(checkBoxElement);
    this.closePopover();
  }

  private updateInputElements(checkBoxElement: CheckBoxElement) {

    for (let el of this.inputElements) {
      el.isChecked = checkBoxElement.records.find(r => r.id == el.id) != null;
    }
  }

  closePopover() {
    this.isMore = false;
    this.form.controls.elements.enable();
    this.closePopOver.emit(true);
  }

  countCheckedBoxes(event: MatCheckboxChange) {
    if (event.checked) {
      this.checkedBoxes++;
    } else {
      this.checkedBoxes--;
    }

    this.isMore = this.checkedBoxes >= 8;
  }
}
