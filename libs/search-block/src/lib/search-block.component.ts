import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss'],
})
export class SearchBlockComponent {
  @Output() valueChanged = new EventEmitter<string>();
  @Input() placeholder = 'search_field';
}
