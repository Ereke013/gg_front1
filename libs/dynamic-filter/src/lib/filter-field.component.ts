import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {DynamicFilterModel} from '@finance.workspace/shared/model';
import {DynamicFilterControl} from './DynamicFilterControl';

@Component({
  selector: 'app-filter-field',
  template: `
    <ng-template #content></ng-template>`,
})
export class FilterFieldComponent implements OnInit {
  @Input() filter: DynamicFilterModel;
  @Input() filterControl: DynamicFilterControl;
  @ViewChild('content', { read: ViewContainerRef, static: true }) vc: ViewContainerRef;

  constructor(
    private readonly cfr: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    const component = await this.filterControl.config.componentResolver(this.filter);
    if (!component) {
      throw new Error('Component not found');
    }
    const componentFactory = this.cfr.resolveComponentFactory(component);
    const componentRef = this.vc.createComponent(componentFactory, undefined, this.injector);
    const instance = componentRef.instance;
    instance.filter = this.filter;
    instance.filterControl = this.filterControl;
    instance.writeValue(this.filter.value);

    this.filterControl._registerViewInstance(this.filter.id, instance);
    componentRef.onDestroy(() => {
      this.filterControl._deregisterViewInstance(this.filter.id);
    });
    this.cdr.detectChanges();
  }

}

