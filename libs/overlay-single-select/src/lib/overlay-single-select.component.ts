import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-overlay-single-select',
  templateUrl: './overlay-single-select.component.html',
  styleUrls: ['./overlay-single-select.component.scss'],
})
export class OverlaySingleSelectComponent<T> implements OnInit {

  @Input() options: T[];
  @Input() value: string;
  @Input() idFieldName: keyof T;
  @Input() labelFieldName: keyof T;
  @Input() useSearch = true;
  @Input() disableInstantFilter = false;
  @Input() lastOptionTemplate?: TemplateRef<any>;
  @Output() selected = new EventEmitter<T>();
  @Output() filterChange = new EventEmitter<string>();

  optionsToShow: T[];

  @Input() asString: (item: T) => string = item => String(item);

  ngOnInit(): void {
    this.optionsToShow = [...this.options];
  }

  filterOptions(value: string) {
    this.filterChange.emit(value);
    if (this.disableInstantFilter) {
      return;
    }
    value = value.toLowerCase();
    this.optionsToShow = this.options.filter(x => {
      const labelField = x[this.labelFieldName] as unknown;
      return (labelField as string).toLowerCase().includes(value);
    });
  }
}
