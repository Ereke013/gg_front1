import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {OrgUnitSelectService} from './org-unit-select.service';
import {Observable, Subject} from 'rxjs';
import {OrgUnitId, OrgUnitRecord, OrgUnitRecordF} from '@finance.workspace/shared/model';
import {distinctUntilChanged, filter, startWith, switchMap} from 'rxjs/operators';
import {Popover, PopoverRef, Position} from '@finance.workspace/popover';
import {removeIf, safeObserve, SubSink} from '@finance.workspace/shared/util';

@Component({
  selector: 'app-org-unit-select',
  templateUrl: './org-unit-select.component.html',
  styleUrls: ['./org-unit-select.component.scss'],
})
export class OrgUnitSelectComponent implements OnInit, OnDestroy {

  //region @Input chosenOrgUnitIds
  private _chosenOrgUnitIds: OrgUnitId[] = [];

  get chosenOrgUnitIds(): OrgUnitId[] {
    return this._chosenOrgUnitIds;
  }

  @Input() set chosenOrgUnitIds(value: OrgUnitId[]) {
    this._chosenOrgUnitIds = value;
    this.chosenUnitIdsSubject.next(value);
  }

  //endregion

  //region @Input chosenOrgUnitId
  private _chosenOrgUnitId: OrgUnitId;

  get chosenOrgUnitId(): OrgUnitId {
    return this._chosenOrgUnitId;
  }

  @Input() set chosenOrgUnitId(value: OrgUnitId) {
    this._chosenOrgUnitId = value;
    if (value) {
      this.chosenOrgUnitIds = [value];
    } else {
      this._chosenOrgUnitId = {
        id: undefined,
        type: undefined,
      };
    }
  }

  //endregion

  @Input() multiple = true;
  @Input() type: 'person' | 'all' = 'all';
  @Output() orgUnitAdded = new EventEmitter<OrgUnitRecord>();
  @Output() orgUnitDeleted = new EventEmitter<OrgUnitRecord>();
  @Output() selectorClosed = new EventEmitter<void>();
  @Output() chosenOrgUnitIdsChanged = new EventEmitter<OrgUnitRecord[]>();
  @Output() chosenOrgUnitIdChanged = new EventEmitter<OrgUnitRecord>();

  orgUnitRecords: OrgUnitRecord[] = [];
  popoverRef: PopoverRef;

  private readonly chosenUnitIdsSubject = new Subject<OrgUnitId[]>();
  private readonly unsub = new SubSink();

  constructor(
    private readonly service: OrgUnitSelectService,
    private readonly popover: Popover,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    const self = this;

    this.unsub.sink = this.chosenUnitIdsSubject.asObservable()
                          .pipe(
                            startWith(this.chosenOrgUnitIds),
                            distinctUntilChanged(compareArrays),
                            filter(nonEmpty),
                            switchMap(loadAsRecords),
                          ).subscribe(setOrgUnitRecords);

    function compareArrays(x, y) {
      if (!x || !y) {
        return false;
      }

      if (x.length !== y.length) {
        return false;
      }

      for (let i = 0; i < x.length; i++) {
        if (x[i].id !== y[i].id) {
          return false;
        }
      }

      return true;
    }

    function nonEmpty(ids: OrgUnitId[]): boolean {
      return ids && ids.length > 0;
    }

    function loadAsRecords(ids: OrgUnitId[]): Observable<OrgUnitRecord[]> {
      return safeObserve(self.service.loadOrgUnitsByIds(ids));
    }

    function setOrgUnitRecords(recs: OrgUnitRecord[]): void {
      self.orgUnitRecords = recs;
      self.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.closePopover();
    this.unsub.unsubscribe();
  }

  openPopover(origin: HTMLElement, content: TemplateRef<any>) {
    const position = Position.right;
    const hasBackdrop = true;
    this.popoverRef = this.popover.open({ origin, content, hasBackdrop, position });
    origin.classList.add('active-icon');
    this.unsub.sink = this.popoverRef.afterClosed.subscribe(() => {
      origin.classList.remove('active-icon');
      this.selectorClosed.emit();
    });
  }

  closePopover() {
    this.popoverRef?.close();
  }

  addOrgUnitRec(rec: OrgUnitRecord) {
    this.orgUnitRecords.push(rec);
    this.chosenOrgUnitIds.push(OrgUnitRecordF.toOrgUnitId(rec));
    this.orgUnitAdded.emit(rec);
    this.chosenOrgUnitIdsChanged.emit(this.orgUnitRecords);
  }

  deleteOrgUnitRec(rec: OrgUnitRecord) {
    removeIf(this.orgUnitRecords, x => x.id === rec.id);
    removeIf(this.chosenOrgUnitIds, x => x.id === rec.id);
    this.orgUnitDeleted.emit(rec);
    this.chosenOrgUnitIdsChanged.emit(this.orgUnitRecords);
  }

  onOrgUnitIdChanged(rec: OrgUnitRecord) {
    this.orgUnitRecords = [rec];
    this.chosenOrgUnitId = OrgUnitRecordF.toOrgUnitId(rec);
    this.chosenOrgUnitIdChanged.emit(rec);
  }
}
