import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Message} from '@finance.workspace/shared/model';

@Component({
  selector: 'app-chat-time-splitter',
  templateUrl: './chat-time-splitter.component.html',
  styleUrls: ['./chat-time-splitter.component.scss'],
})
export class ChatTimeSplitterComponent implements OnInit {

  @Input() message: Message;
  @Input() messages: Message[];
  beforeMessage: Message;
  diffDays: string;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    const index = this.messages.indexOf(this.message);
    this.beforeMessage = this.messages[index + 1];
    if (this.beforeMessage) {
      this.showDiffBetweenDaysInit();
    }
  }

  showDiffBetweenDaysInit(): void {

    const dayBottom = new Date(this.message.createdAt);
    const dayTop = new Date(this.beforeMessage.createdAt);

    if (dayBottom.toLocaleDateString() === dayTop.toLocaleDateString()) {
      return;
    }

    const today = new Date();

    const diffBottom = Math.abs(today.getTime() - dayBottom.getTime());
    const diffBottomDays = Math.ceil(diffBottom / (1000 * 3600 * 24));

    if (diffBottomDays === 1) {
      this.translate.get('today').toPromise().then((text) => this.diffDays = text);
    } else if (diffBottomDays === 2) {
      this.translate.get('yesterday').toPromise().then((text) => this.diffDays = text);
    } else {
      this.diffDays = dayBottom.toLocaleDateString();
    }


  }

}
