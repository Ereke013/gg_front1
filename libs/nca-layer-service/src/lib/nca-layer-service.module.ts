import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpService} from '@finance.workspace/http-service';
import {NcaLayerService} from './nca-layer.service';

@NgModule({
  imports: [CommonModule],
})
export class NcaLayerServiceModule {
  static forRoot(urlPrefix: string): ModuleWithProviders<NcaLayerServiceModule> {
    return {
      ngModule: NcaLayerServiceModule,
      providers: [
        {
          provide: NcaLayerService,
          deps: [HttpService],
          useFactory: (http: HttpService) => new NcaLayerService(urlPrefix, http),
        },
      ],
    };
  }

}
