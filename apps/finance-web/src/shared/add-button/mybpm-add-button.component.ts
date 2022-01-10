import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-mybpm-add-button',
  templateUrl: './mybpm-add-button.component.html',
  styleUrls: ['./mybpm-add-button.component.scss'],
})
export class MybpmAddButtonComponent {
  @Input() text = 'add';
  @Input() isActive = true;
  @Input() color: 'blue' | 'green' = 'green';
  @Input() iconType: 'middle' | 'large' = 'middle';

  get isMiddleIcon(): boolean {
    return this.iconType === 'middle';
  }

  get isLargeIcon(): boolean {
    return this.iconType === 'large';
  }
}
