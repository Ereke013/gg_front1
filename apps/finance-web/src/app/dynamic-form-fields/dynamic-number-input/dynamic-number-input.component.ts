import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {Dict} from "../../../models/dict/Dict";

@Component({
  selector: 'app-dynamic-number-input',
  templateUrl: './dynamic-number-input.component.html',
  styleUrls: ['./dynamic-number-input.component.scss']
})
export class DynamicNumberInputComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControl: AbstractControl;
  @Input() dictList: Dict[];

  constructor() {
  }

  ngOnInit(): void {
  }

  inputChange() {
    if(this.formControl.value?.length === 0) {
      this.formControl.setValue(null);
    }
  }
}
