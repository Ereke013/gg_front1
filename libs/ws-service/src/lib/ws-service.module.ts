import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WsService} from './ws.service';
import {HttpService} from '@finance.workspace/http-service';

@NgModule({ imports: [CommonModule] })
export class WsServiceModule {

  static forRoot(urlPrefix: string): ModuleWithProviders<WsServiceModule> {
    return {
      ngModule: WsServiceModule,
      providers: [
        {
          provide: WsService,
          deps: [HttpService],
          useFactory: (http: HttpService) => new WsService(urlPrefix, http),
        },
      ],
    };
  }

}

