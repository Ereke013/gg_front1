import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Comparators, groupBy} from '@finance.workspace/shared/util';
import {DfControl} from './DfControl';
import {KtdGridComponent, KtdGridLayout} from '@katoid/angular-grid-layout';
import {GridPosition} from './GridPosition';

export function flatGridToLeft<T>(fields: T[], gridPositionResolver: (field: T) => GridPosition) {
  const gridRows = groupBy(fields, x => gridPositionResolver(x)?.y);
  gridRows.forEach(value => {
    value.sort(Comparators.byField(x => gridPositionResolver(x)?.x, false));
    if (!value[0]) { return; }
    const gridPosition = gridPositionResolver(value[0]);
    gridPosition.x = 0;
  });
}

@Component({
  selector: 'app-dynamic-form',
  exportAs: 'appDynamicForm',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(KtdGridComponent) grid: KtdGridComponent;

  @Input() dynamicFormControl: DfControl<T>;
  @Input() flatMode = false;
  layout: KtdGridLayout = [];
  fields: T[] = [];

  ngOnInit(): void {
    this.layout = [];
    this.fields = [];

    const gridPositionResolver = this.dynamicFormControl.config.gridPositionF;
    const toHideResolver = this.dynamicFormControl.config.hideF;
    const needGridSort = this.dynamicFormControl.config.needGridSort;

    const fields = this.dynamicFormControl.fields.filter(x => !toHideResolver(x));
    flatGridToLeft(fields, gridPositionResolver);

    if (needGridSort) {
      this.dynamicFormControl.fields
          .sort(Comparators.byField(x => gridPositionResolver(x)?.x, false))
          .sort(Comparators.byField(x => gridPositionResolver(x)?.y, false));
    }

    for (let i = 0; i < this.dynamicFormControl.fields.length; i++) {
      const field = this.dynamicFormControl.fields[i];
      const id = this.dynamicFormControl.config.idF(field);
      if (toHideResolver(field)) { continue; }
      const gridPosition = gridPositionResolver(field);
      this.fields.push(field);
      this.layout.push({
        id: id,
        x: gridPosition.x,
        y: gridPosition.y,
        h: gridPosition.rows,
        w: gridPosition.cols,
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.grid?.resize(), 100);
  }

  getId = (index: number, field: T) => this.dynamicFormControl.config.idF(field);

  idF(field: T): string {
    return this.dynamicFormControl.config.idF(field);
  }

  ngOnDestroy(): void {
    this.dynamicFormControl.completeValueChanged();
  }

}
