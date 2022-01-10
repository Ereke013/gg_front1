import { Component, OnInit } from '@angular/core';
import { IconRegisterService } from '@finance-web/services/icon-register.service';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, ru_RU } from 'ng-zorro-antd/i18n';
import { StorageSecure } from '@finance-web/providers/modules/StorageSecure';
import { TokenService } from '@finance-web/services/token.service';
import { ScreenUtil } from '@finance-web/app/shares/ScreenUtil';
import { LanguageService } from '@finance-web/services/language.service';
import { Lang } from '@finance-web/models/default_enums/lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'your-finance-front';

  constructor(private readonly iconsRegisterService: IconRegisterService,
              private readonly translate: TranslateService,
              private storageSecure: StorageSecure,
              private languageService: LanguageService,
              private tokenService: TokenService,
              private readonly i18n: NzI18nService
  ) {
    storageSecure.createSecureStorage()
      .then(() => tokenService.prepareData());
    translate.addLangs(['ru', 'en', 'kk']);

    this.printChristmasTree();

    this.setInitialLanguage().then();

    i18n.setLocale(ru_RU);
    iconsRegisterService.init();


  }

  async setInitialLanguage() {
    await this.languageService.initLang();
  }

  ngOnInit(): void {
    AppComponent.checkIsSmall();
    AppComponent.initLang();
  }

  private static checkIsSmall() {
    const clientWidth = document.body.clientWidth;
    ScreenUtil.isSmall = clientWidth <= 540;
  }

  private static initLang() {
    ScreenUtil.lang = localStorage.getItem('languageCode') as Lang;
  }

  private printChristmasTree() {
    const size = 16;
    const symbols = ['* ', 'o ', '♥️ ', '✾ ', '☃ ', '☂ ', '❅ ', '❄ ', '✿ '];

    let space = '';

    for (let s = 0; s < size - 1; s++) {
      space += ' ';
    }

    console.error(space + ' ★');
    for (let i = 1; i < size; i++) {
      let tree = '';

      for (let j = 0; j < i + 1; j++) {
        tree += symbols[getRandomInt(0, symbols.length)];
      }

      console.error(space + tree);
      space = space.substring(0, space.length - 1);
    }
    console.error('\n');

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
}
