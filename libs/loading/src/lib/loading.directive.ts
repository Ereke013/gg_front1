import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {DefaultErrorComponent} from './default-error.component';
import {DefaultLoadingComponent} from './default-loading.component';
import {LoadingControl} from './LoadingControl';

export enum LoadingState {
  PENDING = 'PENDING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[loading]',
})
export class LoadingDirective implements OnDestroy, OnInit {
  private state: LoadingState = LoadingState.PENDING;

  //region @Input() control: LoadingControl
  private _control: LoadingControl;
  private lastDelayId: number;
  error: Error;

  get control(): LoadingControl {
    return this._control;
  }

  @Input('loading') set control(value: LoadingControl) {
    if (!value) { return; }
    this._control = value;
    this._control._registerDirective(this);
  }

  //endregion
  @Input('loadingTemplate') loadingTemplate: TemplateRef<any>;
  @Input('loadingErrorTemplate') loadingErrorTemplate: TemplateRef<any>;
  @Input('loadingDelay') loadingDelay = 150;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.updateView();
  }

  ngOnDestroy(): void {
    this.control?._deregisterDirective();
  }

  setState(state: LoadingState) {
    if (state === this.state) {
      return;
    }
    this.state = state;
    this.updateView();
  }

  private updateView() {
    this.viewContainerRef.clear();
    if (this.state === LoadingState.LOADED) {
      this.createView();
    } else if (this.state === LoadingState.PENDING) {
      this.createDelayedLoadingView();
    } else if (this.state === LoadingState.ERROR) {
      this.createErrorView();
    }
  }

  private createDelayedLoadingView() {
    // this.lastDelayId = setTimeout(() => this.createLoadingView(), this.loadingDelay);
    this.lastDelayId = window.setTimeout(() => this.createLoadingView(), this.loadingDelay);
  }

  private createView() {
    this.clearDelayedView();
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  private createErrorView() {
    this.clearDelayedView();
    if (this.loadingErrorTemplate) {
      this.viewContainerRef.createEmbeddedView(this.loadingErrorTemplate);
    } else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(DefaultErrorComponent);
      const component = this.viewContainerRef.createComponent(factory);
      component.instance.error = this.error;
    }
  }

  private clearDelayedView() {
    if (this.lastDelayId != null) {
      clearTimeout(this.lastDelayId);
    }
  }

  private createLoadingView() {
    if (this.loadingTemplate) {
      this.viewContainerRef.createEmbeddedView(this.loadingTemplate);
    } else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(DefaultLoadingComponent);
      this.viewContainerRef.createComponent(factory);
    }
  }
}
