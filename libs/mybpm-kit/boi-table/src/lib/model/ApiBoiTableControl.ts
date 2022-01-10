import {BehaviorSubject, Subject} from 'rxjs';
import {requireNonNull} from '@finance.workspace/shared/util';
import {ApiBoiTableFilter} from '@finance.workspace/mybpm-kit/controller';
import {BoFieldFilter, BoNativeFieldFilter} from '@finance.workspace/shared/model';

export interface ApiBoiTableConfig {

  code: string;
  heads?: string[];
  filters?: ApiBoiTableFilter[];
  pageSize?: number;
  noData?: string;

}

export class ApiBoiTableControl {

  private readonly boCodeSubject = new BehaviorSubject<string>('');
  public readonly boCode$ = this.boCodeSubject.asObservable();

  private readonly filtersSubject = new BehaviorSubject<ApiBoiTableFilter[]>([]);
  public readonly filters$ = this.filtersSubject.asObservable();

  private readonly dynamicFiltersSubject = new BehaviorSubject<BoFieldFilter[]>([]);
  public readonly dynamicFilters$ = this.dynamicFiltersSubject.asObservable();

  private readonly nativeFiltersSubject = new BehaviorSubject<BoNativeFieldFilter[]>([]);
  public readonly nativeFilters$ = this.nativeFiltersSubject.asObservable();

  private readonly headsSubject = new BehaviorSubject<string[]>([]);
  public readonly heads$ = this.headsSubject.asObservable();

  private readonly recordClickSubject = new Subject<{ boiId: string, event: MouseEvent; }>();
  public readonly recordClick$ = this.recordClickSubject.asObservable();

  constructor(
    private readonly config: ApiBoiTableConfig,
  ) {
    requireNonNull(config.code, 'qFIYHiEj');
    config.heads = config.heads ?? [];
    config.filters = config.filters ?? [];
    config.pageSize = config.pageSize ?? 10;
    config.noData = config.noData ?? 'no data';

    this.boCodeSubject.next(config.code);
    this.filtersSubject.next(config.filters);
    this.headsSubject.next(config.heads);
  }

  get pageSize() {
    return this.config.pageSize;
  }

  get noData() {
    return this.config.noData;
  }

  set filters(filters: ApiBoiTableFilter[]) {
    this.filtersSubject.next(filters);
  }

  set dynamicFilters(filters: BoFieldFilter[]) {
    this.dynamicFiltersSubject.next(filters);
  }

  set nativeFilters(filters: BoNativeFieldFilter[]) {
    this.nativeFiltersSubject.next(filters);
  }

  recordClicked(boiId: string, event: MouseEvent) {
    this.recordClickSubject.next({ boiId, event });
  }

}
