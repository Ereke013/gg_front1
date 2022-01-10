import {Component, Input} from '@angular/core';
import {WritingUser} from '@finance.workspace/shared/model';

@Component({
  selector: 'app-tab-chat-writing-users',
  templateUrl: './tab-chat-writing-users.component.html',
  styleUrls: ['./tab-chat-writing-users.component.scss'],
})
export class WritingUsersComponent {
  @Input() writingUsers: WritingUser[];
}
