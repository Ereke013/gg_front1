import {Directive, HostListener, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ImageViewerComponent} from './image-viewer.component';

@Directive({
  selector: '[appViewImageOnClick]',
})
export class ViewImageOnClickDirective {

  @Input('appViewImageOnClick') fileId: string;

  constructor(
    private readonly dialog: MatDialog,
  ) { }

  @HostListener('click')
  onHostClick() {
    this.dialog.open(ImageViewerComponent, { data: this.fileId });
  }

}
