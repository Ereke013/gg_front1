import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DynamicTable } from '@finance-web/models/dynamic_table/DynamicTable';
import { SubSink } from '@finance.workspace/shared/util';
import { DynamicTableHead } from '@finance-web/models/dynamic_table/DynamicTableHead';
import { BoService } from '@finance-web/services/business-objects.service';
import { TableOrdering } from '@finance-web/models/filter/TableOrdering';
import { TableOrderingState } from '@finance-web/models/filter/TableOrderingState';

@Component({
  selector: 'app-instance-table',
  templateUrl: './instance-table.component.html',
  styleUrls: ['./instance-table.component.scss']
})
export class InstanceTableComponent implements OnInit, OnDestroy {

  table: DynamicTable;

  @Input() set instanceTable(table: DynamicTable) {
    if (!table) {
      return;
    }
    this.table = table;
  }

  @Input() onlyRemoved: boolean;
  @Input() canEdit: boolean;
  @Input() canDelete: boolean;
  @Input() boiTableHasNext: boolean;
  @Input() isSettingButtonNeeded: boolean;
  @Input() isCopyButtonNeeded: boolean;
  @Input() isCustomButtonNeeded: boolean;

  @Output() showBulkUpDeleteIcon = new EventEmitter<boolean>();
  @Output() deleteBoi = new EventEmitter<string[]>();
  @Output() editBO = new EventEmitter<string>();
  @Output() settingsButtonResponse = new EventEmitter<string>();
  @Output() loadNext = new EventEmitter<void>();
  @Output() orderingChanged = new EventEmitter<TableOrdering>();
  @Output() copyBoi = new EventEmitter<string>();

  @Input() ordering: TableOrdering;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
  errorText: string;
  OrderState = TableOrderingState;
  selectedAll = false;

  private selectedValues: Set<string> = new Set<string>();
  private readonly subs = new SubSink();

  constructor(private readonly boService: BoService) {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.table.records.map(x => x.checked = false);
  }

  ngOnInit(): void {
    this.ordering = {
      fieldId: '',
      state: TableOrderingState.UNSET
    };

    this.subs.sink = this.boService.bulkOpButtonClicked$.subscribe(type => {
      if (type === 'delete') {
        this.deleteCheckedInstances();
      } else {
        throw new Error('Unknown type `' + type + '`');
      }

    });
  }

  onScrollDown() {
    this.loadNext.emit();
  }

  setCheckboxes() {
    const checkOptions = this.table.records.filter(x => x.checked);
    this.selectedValues = new Set<string>(checkOptions.map(x => x.instanceId));
    if (this.selectedValues.size > 0) {
      this.showBulkUpDeleteIcon.emit(true);
      this.boService.enableBulkOpButtons();
    } else {
      this.showBulkUpDeleteIcon.emit(false);
      this.boService.disableBulkOpButtons();
    }
  }

  onToggle() {
    this.setCheckboxes();
  }

  onToggleChangeAll() {
    if (this.selectedAll) {
      this.table.records.map(x => x.checked = true);
      this.setCheckboxes();
    } else {
      this.table.records.map(x => x.checked = false);
      this.setCheckboxes();
    }
  }

  toggleOrder(head: DynamicTableHead) {
    if (this.ordering.fieldId === head.fieldId.toString()) {
      this.toggleOrderState();
    } else {
      this.ordering.state = TableOrderingState.ASC;
    }

    this.ordering.fieldId = head.fieldId.toString();
    this.orderingChanged.emit(this.ordering);
  }

  private toggleOrderState() {
    if (this.ordering.state === TableOrderingState.UNSET) {
      this.ordering.state = TableOrderingState.ASC;
    } else if (this.ordering.state === TableOrderingState.ASC) {
      this.ordering.state = TableOrderingState.DESC;
    } else if (this.ordering.state === TableOrderingState.DESC) {
      this.ordering.state = TableOrderingState.UNSET;
    }
  }

  edit(instanceId: string) {
    this.editBO.emit(instanceId);
  }

  deleteInstance(instanceId: string) {
    let delList = [];
    delList.push(instanceId);
    this.deleteBoi.emit(delList);
  }

  deleteCheckedInstances() {

    let delList = [];

    this.table.records.forEach(r => {
      if (r.checked == true) {
        delList.push(r.instanceId);
      }
    });

    this.deleteBoi.emit(delList);
  }

  editProductParamsSettings(instanceId: string) {
    this.settingsButtonResponse.emit(instanceId);
  }

  copyInstance(instanceId: string) {
    this.copyBoi.emit(instanceId);
  }
}
