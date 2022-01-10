import {Directive, HostListener, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {requireNonNull} from '@finance.workspace/shared/util';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[clickBind]' })
export class ClickBindDirective {
  private _subject: Subject<Event> = new Subject<Event>();

  get subject(): Subject<Event> {
    return this._subject;
  }

  @Input('clickBind') set subject(value: Subject<Event>) {
    requireNonNull(value);
    this._subject = value;
  }

  @HostListener('click', ['$event'])
  onHostClick($event: MouseEvent) {
    this.subject.next($event);
  }

}
