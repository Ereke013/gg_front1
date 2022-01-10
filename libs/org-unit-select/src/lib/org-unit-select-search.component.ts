import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {OrgUnitRecord, OrgUnitRecordF} from '@finance.workspace/shared/model';
import {OrgUnitId, OrgUnitType} from '@finance.workspace/shared/model';
import {Observable} from 'rxjs';
import {OrgUnitSelectService} from './org-unit-select.service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import {DEBOUNCE_TIME, safeObserve} from '@finance.workspace/shared/util';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-org-unit-select-search',
  templateUrl: './org-unit-select-search.component.html',
  styleUrls: ['./org-unit-select-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),  // initial
        animate('150ms ease-in', style({ height: '*', opacity: 1 })),  // final
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('150ms ease-out', style({ height: '0px', opacity: '0' })),
      ]),
    ]),
  ],
})
export class OrgUnitSelectSearchComponent implements OnInit {

  //region @Input() chosenOrgUnits
  private _chosenOrgUnitIds: OrgUnitId[];

  get chosenOrgUnitIds(): OrgUnitId[] {
    return this._chosenOrgUnitIds;
  }

  @Input() set chosenOrgUnitIds(value: OrgUnitId[]) {
    this._chosenOrgUnitIds = value;
    if (value) {
      this.chosenOrgUnitIdsSet = new Set(value.map(x => x.id));
    }
  }

  //endregion

  @Input() chosenOrgUnitId: OrgUnitId;
  @Input() multiple = true;
  @Input() type: 'person' | 'all' = 'all';
  @Input() ignoredOrgUnitId: OrgUnitId;

  @Output() orgUnitAdded = new EventEmitter<OrgUnitRecord>();
  @Output() orgUnitDeleted = new EventEmitter<OrgUnitRecord>();
  @Output() chosenOrgUnitIdChanged = new EventEmitter<OrgUnitRecord>();
  @Output() escapeClicked = new EventEmitter();
  @Output() shiftEnterClicked = new EventEmitter();

  searchControl = new FormControl();
  orgUnitRecords$: Observable<OrgUnitRecord[]>;
  chosenOrgUnitIdsSet = new Set<string>();

  orgUnitRecordList: OrgUnitRecord[];
  orgUnitSelectedIndex = -1;
  listSorting = false;

  @ViewChild('searchField') searchField: ElementRef;

  constructor(
    private readonly service: OrgUnitSelectService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    if (!this.ignoredOrgUnitId) {
      this.ignoredOrgUnitId = {
        id: '',
        type: OrgUnitType.PERSON,
      };
    }

    this.orgUnitRecords$ = this.searchControl.valueChanges.pipe(
      debounceTime(DEBOUNCE_TIME),
      distinctUntilChanged(),
      startWith<string, string>(undefined),
      switchMap(searchVal => safeObserve(this.getResource(searchVal))),
      map(data => data.filter(record => record.id !== this.ignoredOrgUnitId.id)),
      tap(records => records.sort(a => this.chosenOrgUnitIdsSet.has(a.id) ? -1 : 1)),
      tap(data => {
        if (this.orgUnitSelectedIndex > (data.length - 1)) {
          this.orgUnitSelectedIndex = 0;
          this.cdr.detectChanges();
        }

        this.orgUnitRecordList = data;
      }));

    setTimeout(() => this.searchField.nativeElement.focus(), 0);
  }

  getResource(searchValue: string) {
    switch (this.type) {
      case 'all':
        return this.service.loadOrgUnits(searchValue);
      case 'person':
        return this.service.loadPersons(searchValue);
    }

    throw new Error('Unknown type `' + this.type + '`');
  }

  getIconType(type: OrgUnitType) {
    switch (type) {
      case OrgUnitType.DEPARTMENT:
        return 'no-color-department';
      case OrgUnitType.GROUP:
        return 'no-color-person-group';
      case OrgUnitType.PERSON:
        return 'no-color-person';
    }
  }

  toggleCheckboxItem(rec: OrgUnitRecord, checkboxChange: MatCheckboxChange) {
    if (checkboxChange.checked) {
      this.chosenOrgUnitIdsSet.add(rec.id);
      this.orgUnitAdded.emit(rec);
    } else {
      this.chosenOrgUnitIdsSet.delete(rec.id);
      this.orgUnitDeleted.emit(rec);
    }
  }

  getId(index: number, rec: OrgUnitRecord) {
    return rec.id;
  }

  toggleRadioButtonItem(rec: OrgUnitRecord) {
    this.chosenOrgUnitId = OrgUnitRecordF.toOrgUnitId(rec);
    this.chosenOrgUnitIdChanged.emit(rec);
  }

  clickArrowUp() {
    if (this.orgUnitSelectedIndex < 0) {
      return;
    }

    this.orgUnitSelectedIndex--;
    this.cdr.detectChanges();
  }

  clickArrowDown() {
    if (this.orgUnitSelectedIndex === (this.orgUnitRecordList.length - 1)) {
      return;
    }

    this.orgUnitSelectedIndex++;
    this.cdr.detectChanges();
  }

  clickEnter() {
    const record = this.orgUnitRecordList[this.orgUnitSelectedIndex];
    if (this.chosenOrgUnitIdsSet.has(record.id)) {
      this.chosenOrgUnitIdsSet.delete(record.id);
      this.orgUnitDeleted.emit(record);
    } else {
      this.chosenOrgUnitIdsSet.add(record.id);
      this.orgUnitAdded.emit(record);
    }
  }
}
