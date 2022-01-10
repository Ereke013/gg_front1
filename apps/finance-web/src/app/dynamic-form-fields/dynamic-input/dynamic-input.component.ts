import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Dict } from '../../../models/dict/Dict';
import {ParameterType} from "@finance-web/models/product/ParameterType";

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControl: AbstractControl;
  @Input() dictList: Dict[];
  @Input() parameterType: ParameterType;

  constructor() {
  }

  ngOnInit(): void {
  }

}
