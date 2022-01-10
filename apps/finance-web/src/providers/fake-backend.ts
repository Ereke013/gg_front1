import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FakeBackendInterceptor} from '@finance-web/providers/interceptors/fake-backend.interceptor';

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
