import {Component, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DynamicFormFieldDirective} from "@finance-web/directives/dynamic-form-field.directive";
import {Subject} from "rxjs";
import {DynamicFormFieldService} from "@finance-web/services/dynamic-form-field.service";
import {ParameterType} from "@finance-web/models/product/ParameterType";

@Component({
  selector: 'app-dynamic-form-fields',
  templateUrl: './dynamic-form-fields.component.html',
  styleUrls: ['./dynamic-form-fields.component.scss']
})
export class DynamicFormFieldsComponent implements OnInit, OnDestroy {

  @ViewChild(DynamicFormFieldDirective, { static: true })
  fieldDirective: DynamicFormFieldDirective;

  private destroySubject = new Subject();

  _paramType: ParameterType;

  @Input()
  public set paramType (paramType: ParameterType) {
    if (!paramType) {
      return;
    }
    this._paramType = paramType;
  }
  @Output() componentOut = new EventEmitter<ComponentRef<unknown>>();

  constructor(private dynamicFormFieldService: DynamicFormFieldService) { }

  ngOnInit(): void {

    this.dynamicFormFieldService.loadComponent(this.fieldDirective.viewContainerRef, this._paramType).then(res => {
      this.componentOut.emit(res);
    });

  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
