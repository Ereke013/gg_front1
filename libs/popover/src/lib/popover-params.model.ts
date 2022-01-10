import {Position} from './position.model';
import {Injector, TemplateRef} from '@angular/core';
import {ComponentType} from '@angular/cdk/overlay';

export interface PopoverParams<T = any> {
  origin: HTMLElement;
  content: ComponentType<any> | TemplateRef<any>;
  position?: Position;
  color?: string;
  hasBackdrop?: boolean;
  needArrow?: boolean;
  withPush?: boolean;
  arrowSize?: number;
  indentSize?: number;
  data?: T;
  injector?: Injector
  xOffset?: number;
  yOffset?: number;
  viewportMargin?: number;
}
