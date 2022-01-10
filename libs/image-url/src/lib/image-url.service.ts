import {Inject, Injectable} from '@angular/core';

@Injectable()
export class ImageUrlService {

  constructor(
    @Inject('urlPrefix') private readonly urlPrefix: string,
  ) {}

  imageUrl(fileId: string) {
    if (!fileId) { return fileId;}
    return `${this.urlPrefix}file/view/${fileId}`;
  }

}
