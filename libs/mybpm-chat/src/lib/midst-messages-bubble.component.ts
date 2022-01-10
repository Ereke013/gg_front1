import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-midst-messages-bubble',
  templateUrl: './midst-messages-bubble.component.html',
  styleUrls: ['./midst-messages-bubble.component.scss'],
})
export class MidstMessagesBubbleComponent {
  @Input() text: string;
}
