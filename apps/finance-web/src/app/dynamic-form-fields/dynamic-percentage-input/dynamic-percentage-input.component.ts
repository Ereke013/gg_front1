import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Dict } from '../../../models/dict/Dict';

@Component({
  selector: 'app-dynamic-percentage-input',
  templateUrl: './dynamic-percentage-input.component.html',
  styleUrls: ['./dynamic-percentage-input.component.scss']
})
export class DynamicPercentageInputComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControl: AbstractControl;
  @Input() dictList: Dict[];

  maxPercentage: number;
  minPercentage: number;

  constructor() {
  }

  ngOnInit(): void {
    this.maxPercentage = 100;
    this.minPercentage = 0;
  }

}
