import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-dynamic-calc',
  templateUrl: './dynamic-calc.component.html',
  styleUrls: ['./dynamic-calc.component.scss']
})
export class DynamicCalcComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControl: AbstractControl;

  constructor() {
  }

  ngOnInit(): void {
  }

}
