import {BoiEventCommentRecord} from './BoiEventCommentRecord';

export interface BoiEventCommentPage {
  nextPageId: string;
  list: BoiEventCommentRecord[];
}
