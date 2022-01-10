import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-overlay-multiple-select',
  templateUrl: './overlay-multiple-select.component.html',
  styleUrls: ['./overlay-multiple-select.component.scss'],
})
export class OverlayMultipleSelectComponent<T> implements OnInit {

  @Input() options: T[];
  @Input() values: T[];
  @Input() idFieldName: keyof T;
  @Input() labelMapper: (item: T) => string;
  @Input() useSearch = true;
  @Input() lastOptionTemplate?: TemplateRef<any>;
  @Output() selected = new EventEmitter<T>();

  optionsToShow: T[];

  constructor(
    private readonly translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.optionsToShow = [...this.options];
  }

  filterOptions(value: string) {
    value = value.toLowerCase();

    this.translateService.get(this.options.map(this.labelMapper)).subscribe(translateMap => {

      const containingKeys = Object.entries(translateMap)
                                   .filter(x => (<string>x[1]).toLowerCase().includes(value))
                                   .map(x => x[0]);

      this.optionsToShow = this.options.filter(x => containingKeys.includes(this.labelMapper(x)));

    });

  }

  optionIsSelected(id: T[keyof T]) {
    return !!this.values?.find(value => value[this.idFieldName] === id);
  }
}
