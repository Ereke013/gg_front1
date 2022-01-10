import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileApplicationsComponent } from './profile-applications.component';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ProfileApplicationsComponent],
  exports: [ProfileApplicationsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    ImageCacheModule,
    MatIconModule
  ]
})
export class ProfileApplicationsModule {
}
