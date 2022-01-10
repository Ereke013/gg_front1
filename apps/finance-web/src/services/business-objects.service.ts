import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Observable} from "rxjs/internal/Observable";


export type BulkOpButtonType = 'delete' | 'export';

@Injectable()
export class BoService {

  private readonly bulkOpButtonsEnabledSubject = new Subject<boolean>();
  public readonly bulkOpButtonsEnabled$: Observable<boolean> = this.bulkOpButtonsEnabledSubject.asObservable();

  private readonly bulkOpButtonClickedSubject = new Subject<BulkOpButtonType>();
  public readonly bulkOpButtonClicked$: Observable<BulkOpButtonType> = this.bulkOpButtonClickedSubject.asObservable();

  enableBulkOpButtons() {
    this.bulkOpButtonsEnabledSubject.next(true);
  }

  disableBulkOpButtons() {
    this.bulkOpButtonsEnabledSubject.next(false);
  }

  bulkOpButtonClicked(type: BulkOpButtonType) {
    this.bulkOpButtonClickedSubject.next(type);
  }
}
