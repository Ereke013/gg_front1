import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatLineModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TabChatInputComponent} from './tab-chat-input.component';
import {WritingUsersComponent} from './tab-chat-writing-users.component';
import {TabChatMessageComponent} from './tab-chat-message.component';
import {TabChatInputReplyComponent} from './tab-chat-input-reply.component';
import {TabChatRepliedMessageComponent} from './tab-chat-replied-message.component';
import {ChatImageAttachmentsComponent} from './chat-image-attachments.component';
import {ChatTimeSplitterComponent} from './chat-time-splitter.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TabChatComponent} from './tab-chat.component';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {MidstMessagesBubbleComponent} from './midst-messages-bubble.component';
import {OrgUnitSelectModule} from '@finance.workspace/org-unit-select';
import {FocusOnInitModule} from '@finance.workspace/focus-on-init';
import {ImageViewerModule} from '@finance.workspace/image-viewer';
import {ImageUrlModule} from '@finance.workspace/image-url';
import {FileUtilModule} from '@finance.workspace/file-util';
import {ClickUtilModule} from '@finance.workspace/click-util';
import {TabChatService} from './tab-chat.service';
import {WsServiceModule} from '@finance.workspace/ws-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatLineModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    CdkScrollableModule,
    OrgUnitSelectModule,
    ImageViewerModule,
    FocusOnInitModule,
    MatIconModule,
    ImageUrlModule,
    FileUtilModule,
    ClickUtilModule,
    WsServiceModule,
  ],
  declarations: [
    TabChatInputComponent,
    WritingUsersComponent,
    TabChatMessageComponent,
    TabChatInputReplyComponent,
    TabChatRepliedMessageComponent,
    ChatImageAttachmentsComponent,
    ChatTimeSplitterComponent,
    MidstMessagesBubbleComponent,
    TabChatComponent,
  ],
  exports: [TabChatComponent],
  providers: [TabChatService],
})
export class TabChatModule {}
