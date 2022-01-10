import {
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  Optional,
  Output,
  Type,
  ViewEncapsulation,
} from '@angular/core';

export const UI_CHIP_COMPONENT = new InjectionToken<Type<any>>('uiChipComponent');

@Component({
  selector: 'ui-chip',
  templateUrl: './ui-chip.component.html',
  styleUrls: ['./ui-chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UiChipComponent {

  @Input() text = '';
  @Input() hasCloseButton = true;
  @Output() closeClicked = new EventEmitter<MouseEvent>();

  constructor(
    @Optional()
    @Inject(UI_CHIP_COMPONENT)
    private readonly component: Type<any>,
  ) {}

  get c() {
    return this.component;
  }

}
