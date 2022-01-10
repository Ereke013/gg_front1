/* eslint-disable @typescript-eslint/no-unused-vars */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {
  DynamicFilterModel,
  DynamicFilterProperties,
  DynamicFilterType,
  DynamicFilterValueOrgUnit,
} from '@finance.workspace/shared/model';
import {DynamicFilterControl} from './DynamicFilterControl';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFilterComponent {

  //region @Input() filterControl: DynamicFilterControl;
  private _filterControl: DynamicFilterControl;

  get filterControl(): DynamicFilterControl {
    return this._filterControl;
  }

  @Input() set filterControl(value: DynamicFilterControl) {
    this._filterControl = value;
    this._filterControl._registerCdr(this.cdr);
  }

  //endregion

  @Input() isColumnDirection = false;
  @Input() hasVertDots = false;
  @Input() forEdit = true;
  @Output() vertDotsClicked = new EventEmitter<{ event: Event, dotsOrigin: HTMLDivElement }>();

  DynamicFilterType = DynamicFilterType;

  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {}

  deleteFilter(item: DynamicFilterModel) {
    this.filterControl.deleteFilter(item.id);
  }

  getProperties(filterId: string): DynamicFilterProperties {
    return this.filterControl.propertyMap.get(filterId);
  }

  isDirectionColumnEnabled(item: DynamicFilterModel): boolean {
    if (item.type === DynamicFilterType.ORG_UNIT) {
      const value = item.value as DynamicFilterValueOrgUnit;
      return this.isColumnDirection && !this.getProperties(item.id).chipsMode && value.orgUnitRecords.length !== 1;
    } else {
      return this.isColumnDirection && !this.getProperties(item.id).chipsMode;
    }
  }

  unChip(id: string) {
    if (!this.forEdit) {
      return;
    }

    this.filterControl.unChip(id);
  }

}
