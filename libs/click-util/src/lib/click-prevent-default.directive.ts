import {Directive, HostListener} from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[clickPreventDefault]' })
export class ClickPreventDefaultDirective {

  @HostListener('click', ['$event'])
  onHostClick($event: MouseEvent) {
    $event.preventDefault();
  }

}
