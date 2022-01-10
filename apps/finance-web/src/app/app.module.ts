import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeRu from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { WebpackTranslateLoader } from '@finance-web/i18n/webpack-translate-loader';
import { HttpServiceModule } from '@finance.workspace/http-service';
import { ImageUrlModule } from '@finance.workspace/image-url';
import { FileUtilModule } from '@finance.workspace/file-util';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { NotificationModule } from '@finance.workspace/notification';
import { NZ_DATE_CONFIG, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import ru from 'date-fns/locale/ru';
import { NotificationInterceptor } from '@finance-web/providers/interceptors/notification.interceptor';
import { AdminModule } from '@finance-web/app/pages/admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormFieldsModule } from '@finance-web/app/dynamic-form-fields/dynamic-form-fields.module';
import { DynamicFormFieldService } from '@finance-web/services/dynamic-form-field.service';
import { StorageModule } from '@finance-web/providers/modules/storage.module';
import { ClientModule } from '@finance-web/app/pages/client/client.module';
import { ProfileModule } from '@finance-web/app/pages/client/profile/profile.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '@finance-web/environments/environment';
import { NcaLayerServiceModule } from '@finance.workspace/nca-layer-service';
import { WsServiceModule } from '@finance.workspace/ws-service';
import { AuthInterceptor } from '@finance-web/providers/interceptors/auth.interceptor';
import { AlertComponent } from '@finance-web/app/components/alert/alert.component';
import { NewsHeaderComponent } from './components/news-header/news-header.component';

registerLocaleData(localeRu);

const translateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useClass: WebpackTranslateLoader
  }
};

const maskConfig: Partial<IConfig> = {
  validation: false
};

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    WsServiceModule.forRoot(environment.wsUrlPrefix),
    NcaLayerServiceModule.forRoot(environment.ncaLayerWsUrlPrefix),
    TranslateModule.forRoot(translateModuleConfig),
    HttpServiceModule.forRoot(environment.urlPrefix),
    ImageUrlModule.forRoot(environment.urlPrefix),
    FileUtilModule.forRoot(),
    QuillModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    StorageModule.forRoot(),
    QuillModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    AdminModule,
    ClientModule,
    BrowserAnimationsModule,
    DynamicFormFieldsModule,
    ProfileModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [
    TranslateService,
    DynamicFormFieldService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
    { provide: LOCALE_ID, useFactory: () => 'ru' },
    { provide: NZ_DATE_CONFIG, useValue: { firstDayOfWeek: 1 } },
    { provide: NZ_DATE_LOCALE, useValue: ru }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
