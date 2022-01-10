import {Message} from './Message';

export interface MessagePage {
  list: Message[];
  nextPageId: string;
  lastReadDate: Date;
}
