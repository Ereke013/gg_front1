import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'app-expansion-panel',
  exportAs: 'appExpansionPanel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state('in', style({ overflow: 'hidden', height: '*' })),
      state('out', style({ overflow: 'hidden', height: '0px' })),
      transition('in => out', animate('250ms ease-in-out')),
      transition('out => in', animate('250ms ease-in-out')),
    ]),
  ],

})
export class ExpansionPanelComponent implements OnChanges, OnInit {
  //region @Input() defaultExpanded: boolean
  private _defaultExpanded;

  get defaultExpanded(): boolean {
    return this._defaultExpanded;
  }

  @Input() set defaultExpanded(value: boolean) {
    this._defaultExpanded = coerceBooleanProperty(value);
  }

  //endregion
  @Input() expanded = false;
  animationStatus = 'out';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.defaultExpanded) {
      setTimeout(this.toggle.bind(this));
    }
  }

  toggle() {
    this.expanded = !this.expanded;
    this.animationStatus = this.expanded ? 'in' : 'out';
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.animationStatus = this.expanded ? 'in' : 'out';
  }


}
