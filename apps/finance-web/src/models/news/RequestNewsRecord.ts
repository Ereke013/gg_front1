import {NewsRecord} from "./NewsRecord";

export interface RequestNewsRecord {
  newsList: NewsRecord[],
  loadMore: boolean,
}
