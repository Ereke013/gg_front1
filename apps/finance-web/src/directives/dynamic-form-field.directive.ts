import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[dynamicFormFieldDirective]' })
export class DynamicFormFieldDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
