import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EditProductComponent} from '@finance-web/app/components/edit-product/edit-product.component';
import {FormBuilder} from '@angular/forms';
import {AdminController} from '@finance-web/controller/AdminController';
import {TranslateService} from '@ngx-translate/core';
import {Product} from '@finance-web/models/product/Product';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {CreditConsumerController} from "@finance-web/controller/CreditConsumerController";

@Component({
  selector: 'app-product-parameter-settings',
  templateUrl: './product-parameter-settings.component.html',
  styleUrls: ['./product-parameter-settings.component.scss']
})
export class ProductParameterSettingsComponent implements OnInit {

  buttonName: any;
  titleName: any;
  product: Product;

  constructor(private dialogRef: MatDialogRef<EditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public id,
              private fb: FormBuilder,
              private adminController: AdminController,
              private translateService: TranslateService,
              private clientController: CreditConsumerController) {

    this.buttonName = id == null ? this.translateService.instant('add') : this.translateService.instant('edit');
    this.titleName = id == null ? this.translateService.instant('add_title') : this.translateService.instant('edit_title');
  }

  ngOnInit(): void {

    if (this.id != null) {

      this.adminController.getProductDetail(this.id).then(res => {
        this.product = res;

        this.clientController.getLocations().then(x => {
          for (const reg of x) {
            const i = this.product.parameters.filter(r => r.displayTitle === reg.region)[0];
            const idx = this.product.parameters.indexOf(i);
            if (idx !== -1) {
              this.product.parameters.splice(idx, 1);
            }
          }
          const i = this.product.parameters.filter(r => r.displayTitle === "Регионы")[0];
          const idx = this.product.parameters.indexOf(i);
          if (idx !== -1) {
            this.product.parameters.splice(idx, 1);
          }
        });
      });
    }
  }

  submit() {
    this.dialogRef.close(this.product);
  }

  closeHandler() {
    this.dialogRef.close(null);
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.product.parameters, event.previousIndex, event.currentIndex);
  }
}
