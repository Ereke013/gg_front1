import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconRegisterService {

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {}

  public init() {

    this.matIconRegistry.addSvgIconResolver((name, namespace) => {
      const url = `assets/icons/${namespace ? namespace + '/' : ''}${name}.svg`;
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    });

  }
}
