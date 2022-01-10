import {Pipe, PipeTransform} from '@angular/core';
import {ImageUrlService} from './image-url.service';

@Pipe({ name: 'imageUrl' })
export class ImageUrlPipe implements PipeTransform {

  constructor(
    private readonly service: ImageUrlService,
  ) {}

  transform(fileId: string, type?: 'avatar'): string {
    return fileId ? this.service.imageUrl(fileId) : type === 'avatar' ? '/assets/images/avatar.png' : '';
  }

}
