import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileMetaInfo} from '@finance.workspace/shared/model';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
})
export class FileSelectorComponent {
  @Input() fileList: FileMetaInfo[];
  @Input() type: 'list' | 'tile' = 'list';
  @Input() hasDelete: boolean = true;
  @Output() addClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<string>();

  get selectorTypeIsList(): boolean {
    return this.type === 'list';
  }

}
