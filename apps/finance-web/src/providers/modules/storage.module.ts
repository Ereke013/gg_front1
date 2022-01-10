import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { StorageSecure } from './StorageSecure';
import { StorageSecureBrowserService } from './StorageSecureBrowserService';


export function secureStorageFactory(): any {
  return new StorageSecureBrowserService();
}

const SERVICES = [
  {
    provide: StorageSecure,
    useFactory: secureStorageFactory
  }
];

@NgModule({
  declarations: [],
  imports: []
})
export class StorageModule {

  constructor(@Optional() @SkipSelf() parentModule: StorageModule) {
    throwIfAlreadyLoaded(parentModule,
      'StorageModule');
  }

  static forRoot(): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [...SERVICES]
    } as ModuleWithProviders<StorageModule>;
  }

}
