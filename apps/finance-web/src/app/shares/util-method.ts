import { DynamicTable } from '../../models/dynamic_table/DynamicTable';
import { DynamicTableRecord } from '@finance-web/models/dynamic_table/DynamicTableRecord';
import { DynamicTableFieldValue } from '@finance-web/models/dynamic_table/DynamicTableFieldValue';
import { AllFilters } from '@finance-web/models/all-filters/AllFilters';
import { ParameterType } from '@finance-web/models/product/ParameterType';
import {UserRole} from "@finance-web/models/client/UserRole";
import {NavigationItem} from "@finance-web/app/components/admin-navigation/admin-navigation.component";

export function deleteRecordFromTable(boiTable: DynamicTable, id: string) {

  let deleteId = 0;
  let i = 0;
  boiTable.records.forEach(r => {
    if (r.instanceId === id) {
      deleteId = i;
      return;
    }
    i++;
  });

  boiTable.records.splice(deleteId, 1);
}

export function addRecordToTable(table: DynamicTable, id: string, fieldVal: DynamicTableFieldValue[], toEdit: boolean) {

  let record: DynamicTableRecord = {
    instanceId: id,
    values: fieldVal,
    checked: false
  };

  if (toEdit == false) {
    table.records.unshift(record);
  } else {
    table.records.forEach(rec => {
      if (rec.instanceId == id) {
        rec.values = fieldVal;
      }
    });
  }
}

export function changeFilter(filter: any, filterListChange: any, mform: any) {
  const filter_index = filterListChange.filters.findIndex(f => f.title === filter.title);

  if (filter_index != -1) {
    filterListChange.filters[filter_index] = filter;
  } else {
    filterListChange.filters.push(filter);
  }
  mform.setValue(filterListChange);
}

export function numberWithSpaces(x) {
  if (x) {
    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }
}

export function addNoChooseValue(filters: AllFilters[]) {
  const dict = { dict: 'nothingIsChosen', displayTitle: 'Не выбрано' };

  for (let i = 0; i < filters.length; i++) {
    if (filters[i].type === ParameterType.DICT || filters[i].type === ParameterType.MULTI_DICT || filters[i].type === ParameterType.NOT_MULTI_DICT
      || filters[i].type === ParameterType.COMBO_DICT
      || filters[i].type === ParameterType.SELECTOR
      || filters[i].type === ParameterType.DATE_SELECTOR)
      filters[i].values = [dict].concat(filters[i].values);
  }

  return filters;
}

export function adminAccess(currentUser, accessRoles: string[]) {
  for(const userRole of currentUser.roles){
    if(accessRoles.includes(userRole)){
      return true;
    }
  }
  return false;
}

export function disableNavigateOnRole(currentUser) {
  const items: NavigationItem[] =
    [
      {
        url: 'admin/product',
        title: 'products',
        accessRoles: [UserRole.ADMIN, UserRole.PRODUCT_MANAGER, UserRole.APPLICATION_MANAGER, UserRole.FO_MANAGER]
      },
      {
        url: 'admin/product-parameters',
        title: 'product_params',
        accessRoles: [UserRole.ADMIN, UserRole.PRODUCT_MANAGER]
      },
      {
        url: 'admin/dict',
        title: 'dict',
        accessRoles: [UserRole.ADMIN, UserRole.PRODUCT_MANAGER]
      },
      {
        url: 'admin/bank-contacts',
        title: 'bank_contacts',
        accessRoles: [UserRole.ADMIN]
      },
      {
        url: 'admin/application',
        title: 'client_application',
        accessRoles: [UserRole.ADMIN, UserRole.APPLICATION_MANAGER, UserRole.FO_MANAGER]
      },
      {
        url: 'admin/report',
        title: 'reports',
        accessRoles: [UserRole.ADMIN, UserRole.FO_MANAGER]
      },
      {
        url: 'admin/roles',
        title: 'roles',
        accessRoles: [UserRole.ADMIN]
      },
      {
        url: 'admin/news-admin',
        title: 'news',
        accessRoles: [UserRole.ADMIN, UserRole.NEWS_MANAGER]
      }
    ];

  for (let i = 0; i < items?.length; i++) {
    if (!(currentUser.roles.filter(cr => items[i].accessRoles.includes(cr)).length > 0)) {
      items.splice(i, 1);
      i--;
    }
  }
  return items;
}
