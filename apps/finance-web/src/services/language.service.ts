import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageSecure } from '../providers/modules/StorageSecure';
import { StorageSecureKeyEnum } from '../models/auth';

export const DEFAULT_LANGUAGE_CODE = 'ru';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languages = [
    {
      id:    'ru',
      title: 'Русский'
    },
    {
      id:    'kk',
      title: 'Қазақша'
    },
    {
      id:    'en',
      title: 'English'
    }
  ];

  currentLanguageCode = '';

  constructor(private translate: TranslateService,
              private storageSecure: StorageSecure) {

  }

  async initLang(): Promise<boolean> {

    const code = await this.storageSecure.getItem(StorageSecureKeyEnum.LANGUAGE_CODE) || DEFAULT_LANGUAGE_CODE;
    this.currentLanguageCode = code;

    this.translate.setDefaultLang(code);
    this.translate.use(code);
    return true;

  }

  changeLanguage(code: string) {

    // this.translate.reloadLang(code).subscribe(() =>{
    //   this.currentLanguageCode = code;
    //   this.translate.use(code);
    // });

    this.storageSecure.setItem(StorageSecureKeyEnum.LANGUAGE_CODE, code).then();
    window.location.reload();

  }

  getLanguages() {
    return this.languages;
  }

  getCurrentLanguageCode(){
    return this.currentLanguageCode;
  }

  getCurrentLanguageTitle(){
    const lang = this.languages.find(f => f.id == this.currentLanguageCode);
    return lang.title;
  }

  get(key: string | string[], values?: any) {
    let params = null;
    if (!!values) {
      params = {};
      values.forEach((item, index) => {
        params[`value${index + 1}`] = item;
      });
    }
    return this.translate.instant(key,
      params);
  }

}
