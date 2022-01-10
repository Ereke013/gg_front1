import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {AbstractDffDirective, DffControl} from '..';
import {DfControl} from './DfControl';

@Component({
  selector: 'app-dff-common',
  template: '<ng-template #content></ng-template>',
})
export class DffCommonComponent<T> implements OnInit {

  @Input() field: T;
  @Input() control: DfControl<T>;
  @ViewChild('content', { read: ViewContainerRef, static: true }) vc: ViewContainerRef;

  constructor(
    private readonly cfr: ComponentFactoryResolver,
    private readonly cdr: ChangeDetectorRef,
    private readonly injector: Injector,
  ) {}

  async ngOnInit() {
    const component = await this.control.dffResolver(this.field);
    if (!component) {
      return;
    }

    const componentFactory = this.cfr.resolveComponentFactory(component);
    const fieldControl = this.control.getField(this.field);
    const componentRef = this.vc.createComponent(componentFactory, undefined, Injector.create({
      parent: this.control.config.injector ?? this.injector,
      providers: [{ provide: DffControl, useValue: fieldControl }],
    }));
    componentRef.instance.init(this.control);
    componentRef.instance.elementRef.nativeElement.style.height = '100%';
    fieldControl.viewRef = componentRef.instance;
    this.cdr.detectChanges();
  }

  resolve(formField: T): Promise<Type<AbstractDffDirective<T>>> {
    return this.control.dffResolver(formField);
  }

}
