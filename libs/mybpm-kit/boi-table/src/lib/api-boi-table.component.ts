import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {ApiBoiTableControl} from './model/ApiBoiTableControl';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject, combineLatest, EMPTY, Subject} from 'rxjs';
import {BoFieldFilter, BoNativeFieldFilter, OrderState} from '@finance.workspace/shared/model';
import {debounceTime, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {requireNonNull, safeObserve, SubSink} from '@finance.workspace/shared/util';
import {loading, LoadingControl, LoadingState} from '@finance.workspace/loading';
import {
  ApiBoiTableFilter,
  ApiBoiTableHead,
  ApiBoiTableRecord,
  ApiBoiTableReq,
  ApiBoiTableRes,
  LibBoiController,
} from '@finance.workspace/mybpm-kit/controller';

@Component({
  selector: 'mb-api-boi-table',
  templateUrl: './api-boi-table.component.html',
  styleUrls: ['./api-boi-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ApiBoiTableComponent implements OnDestroy {

  //region @Input control: ApiBoiTableControl;
  private _control: ApiBoiTableControl;

  get control(): ApiBoiTableControl {
    return this._control;
  }

  @Input()
  set control(value: ApiBoiTableControl) {
    requireNonNull(value, 'zRgPr3zi3');
    this._control = value;
    this.afterControlSet();
  }

  //endregion
  tableLoading: LoadingControl = new LoadingControl();
  nextLoading: LoadingControl = new LoadingControl(LoadingState.LOADED);
  table: ApiBoiTableRes;
  currentOffset = 0;
  OrderState = OrderState;

  private readonly subs = new SubSink();

  private readonly orderCodeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private readonly orderStateSubject: BehaviorSubject<OrderState> = new BehaviorSubject<OrderState>(undefined);
  private readonly loadNextSubject: Subject<void> = new Subject<void>();

  readonly loadNext$: Observable<void> = this.loadNextSubject.asObservable();
  readonly orderCode$: Observable<string> = this.orderCodeSubject.asObservable();
  readonly orderState$: Observable<OrderState> = this.orderStateSubject.asObservable();

  constructor(
    private readonly controller: LibBoiController,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadNext() {
    this.loadNextSubject.next();
  }

  get hasNext(): boolean {
    if (!this.table) { return true; }
    return this.table?.hasNext;
  }

  get isTableError() {
    return this.tableLoading.is(LoadingState.ERROR);
  }

  get orderState() {
    return this.orderStateSubject.value;
  }

  get orderCode() {
    return this.orderCodeSubject.value;
  }

  recordClicked(rec: ApiBoiTableRecord, $event: MouseEvent) {
    this.control.recordClicked(rec.instanceId, $event);
  }

  toggleSort(head: ApiBoiTableHead) {
    if (this.orderCode === head.code) {
      this.toggleOrderState();
    } else {
      this.orderStateSubject.next(OrderState.ASC);
    }

    this.orderCodeSubject.next(head.code);
  }

  private toggleOrderState() {
    if (this.orderState === OrderState.UNSET) {
      this.orderStateSubject.next(OrderState.ASC);
    } else if (this.orderState === OrderState.ASC) {
      this.orderStateSubject.next(OrderState.DESC);
    } else if (this.orderState === OrderState.DESC) {
      this.orderStateSubject.next(OrderState.UNSET);
    }
  }

  private afterControlSet() {
    this.initContext();
  }

  private initContext() {

    this.subs.unsubscribe();
    const self = this;

    const req$ = combineLatest([
      this.control.heads$,
      this.control.boCode$,
      this.control.filters$,
      this.control.dynamicFilters$,
      this.control.nativeFilters$,
      this.orderCode$,
      this.orderState$,
    ]).pipe(debounceTime(150), map(mapToReq));

    function mapToReq(
      [heads, boCode, filters, dynamicFilters, nativeFilters, orderCode, orderState]
        : [string[], string, ApiBoiTableFilter[], BoFieldFilter[], BoNativeFieldFilter[], string, OrderState],
    ): ApiBoiTableReq {
      return {
        boCode: boCode,
        headCodes: heads,
        filters: filters,
        dynamicFilters: dynamicFilters,
        nativeFilters: nativeFilters,
        paging: {
          offset: 0, limit: self.control.pageSize,
        },
        orderingFieldCode: orderCode,
        orderState: orderState,
      };
    }

    this.subs.sink = req$.pipe(
      switchMap(req => this.safeLoadTable(req, this.tableLoading)),
      loading(this.tableLoading),
    ).subscribe(table => {
      this.table = table;
      this.cdr.detectChanges();
    });

    this.subs.sink = this.loadNext$.pipe(
      filter(() => this.hasNext),
      tap(() => this.nextLoading.setPending()),
      withLatestFrom(req$),
      map(setReqPaging),
      switchMap(req => this.safeLoadTable(req, this.nextLoading)),
      tap(incrementCurrentOffset),
      loading(this.nextLoading),
    ).subscribe(table => {
      this.table.hasNext = table.hasNext;
      this.table.records.push(...table.records);
      this.cdr.detectChanges();
    });

    function setReqPaging([, req]: [never, ApiBoiTableReq]): ApiBoiTableReq {
      const pageSize = self.control.pageSize;
      req.paging = { offset: self.currentOffset + pageSize, limit: pageSize };
      return req;
    }

    function incrementCurrentOffset(): void {
      self.currentOffset += self.control.pageSize;
    }

  }

  private safeLoadTable(req: ApiBoiTableReq, loadingControl: LoadingControl): Observable<ApiBoiTableRes> {
    return safeObserve(this.controller.loadApiBoiTable(req), err => {
      loadingControl.setError(err);
      return EMPTY;
    });
  }
}
