import {TranslateLoader} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {single} from 'rxjs/operators';
// @ts-ignore
import ru from "./ru";
// @ts-ignore
import en from './en';
// @ts-ignore
import kk from './kk';

export class WebpackTranslateLoader implements TranslateLoader {
  // @ts-ignore
  getTranslation(lang: string): Observable<any> {
    switch (lang) {
      case 'ru': {
        return of(ru).pipe(single());
      }
      case 'en': {
        return of(en).pipe(single());
      }
      case 'kk': {
        return of(kk).pipe(single());
      }
    }
  }

}
