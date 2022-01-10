import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-mybpm-link',
  templateUrl: './mybpm-link.component.html',
  styleUrls: ['./mybpm-link.component.scss'],
})
export class MybpmLinkComponent {
  constructor(
    private readonly elementRef: ElementRef,
  ) {}

  get element(): ElementRef {
    return this.elementRef;
  }
}
