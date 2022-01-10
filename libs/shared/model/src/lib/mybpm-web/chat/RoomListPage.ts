import {RoomRecord} from './RoomRecord';

export interface RoomListPage {
  list: RoomRecord[];
  nextPageId: string;
}
