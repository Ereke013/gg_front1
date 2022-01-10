import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AdminController} from "@finance-web/controller/AdminController";
import {ProductParameterForFilter} from "@finance-web/models/product/ProductParameterForFilter";
import {SelectItem} from "@finance-web/models/help/SelectItem";
import {MatOptionSelectionChange} from "@angular/material/core";
import {Dict} from "@finance-web/models/dict/Dict";
import {ParameterType} from "@finance-web/models/product/ParameterType";
import {ProductParameter} from "@finance-web/models/product/ProductParameter";

@Component({
  selector: 'app-param-test-page',
  templateUrl: './param-test-page.component.html',
  styleUrls: ['./param-test-page.component.scss']
})
export class ParamTestPageComponent implements OnInit {

  parameterForFilterList: ProductParameterForFilter[];

  dictType = ParameterType.DICT;

  constructor(private adminController: AdminController) {
  }

  ngOnInit(): void {

    this.adminController.getProductParametersForFilter(null, null).then(res => {
      this.parameterForFilterList = res;
      this.parameterForFilterList.forEach(p => p.level = 1);
    })
  }

  dictValueSelected(event: MatOptionSelectionChange, dictValueCode: string, parent: ProductParameterForFilter) {
    if (event.isUserInput) {
      this.adminController.getProductParametersForFilter(dictValueCode, parent.id).then(res => {
        this.updateParameterForFilterList(res, parent);
      })
    }
  }

  private updateParameterForFilterList(list: ProductParameterForFilter[], parentParameter: ProductParameterForFilter) {

    this.cleanUpParametersAfterSelectChange(parentParameter);

    for (let i = this.parameterForFilterList.length - 1; i >= 0; i--) {
      if (this.parameterForFilterList[i].level >= (parentParameter.level + 1)) {
        this.parameterForFilterList.splice(i, 1);
      }
    }

    for (let l of list) {

      l.parentId = parentParameter.id;
      l.level = parentParameter.level + 1;

      if (this.parameterForFilterList.find(p => p.id === l.id) == null) {
        this.parameterForFilterList.push(l);
      }
    }
  }

  private cleanUpParametersAfterSelectChange(parentParameter: ProductParameterForFilter) {
    for (let i = this.parameterForFilterList.length - 1; i >= 0; i--) {
      if (this.parameterForFilterList[i].level >= (parentParameter.level + 1)
        && this.isParameterChild(this.parameterForFilterList[i], parentParameter)) {

        this.parameterForFilterList.splice(i, 1);
      }
    }
    this.removeParameterWithNoParent();
  }

  private isParameterChild(parameter: ProductParameterForFilter, parentParameter: ProductParameterForFilter) : boolean {
    return (parameter.parentId === parentParameter.id);  }

  private removeParameterWithNoParent() {
    for (let i = this.parameterForFilterList.length - 1; i >= 0; i--) {
      if (this.parameterForFilterList.find(pp => pp.id === this.parameterForFilterList[i].parentId) == null
        && this.parameterForFilterList[i].parentId != null) {

        this.parameterForFilterList.splice(i, 1);
      }
    }
  }
}



