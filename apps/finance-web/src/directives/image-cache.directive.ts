import { Directive, ElementRef, Input } from '@angular/core';
import { AppBackgroundImageInput } from '../models/file/ImageCacheInput';
import { environment } from '@finance-web/environments/environment';

@Directive({ selector: '[appImageCache]' })
export class ImageCacheDirective {

  @Input('appSetImage')
  public set appSetImage(appBackgroundImageInput: AppBackgroundImageInput) {
    if (!appBackgroundImageInput) {
      appBackgroundImageInput = {
        id: ''
      };
    }

    this.el.nativeElement.setAttribute('loading', 'lazy');
    this.setBackgroundImage(appBackgroundImageInput);
  }

  constructor(private el: ElementRef) {
  }

  setBackgroundImage(appBackgroundImageInput: AppBackgroundImageInput) {
    if (appBackgroundImageInput.id) {
      this.el.nativeElement.src = environment.imageUrl + '?fileId=' + appBackgroundImageInput.id;
    }
  }
}
