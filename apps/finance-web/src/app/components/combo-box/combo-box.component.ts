import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AllFilters} from '@finance-web/models/all-filters/AllFilters';
import {Dict} from '@finance-web/models/dict/Dict';
import {ParameterType} from "@finance-web/models/product/ParameterType";
import {FilterToProduct} from "@finance-web/models/all-filters/FilterToProduct";

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent implements OnInit {
  @Input() list: AllFilters;
  @Input() filterTitle: string;

  @Output() comboFilter = new EventEmitter<FilterToProduct>();

  inputItem = '';
  listHidden = true;
  showError = false;
  selectedIndex = -1;
  filteredList: Dict[] = [];

  filter: FilterToProduct;

  emptyInput: boolean = true;

  constructor() {
  }

  ngOnInit() {
    this.filteredList = this.list.values;
  }

  getFilteredList() {
    this.listHidden = false;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.values.filter((item) => item.displayTitle.toLowerCase().includes(this.inputItem.toLowerCase()));
    }
  }

  selectItem(ind) {
    if (ind != -1) {
      this.inputItem = this.filteredList[ind].displayTitle;
      this.filter = {
        title: this.filterTitle,
        type: ParameterType.COMBO_DICT,
        value: this.filteredList[ind].dict
      };

      this.emptyInput = false;

      if (this.filteredList[ind].dict === 'nothingIsChosen') {
        this.filter.value = null;
        this.inputItem = '';
        this.emptyInput = true;
      }

      this.comboFilter.emit(this.filter);
    }
    this.listHidden = true;
    this.selectedIndex = ind;
  }

  onKeyPress(event) {
    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      } else if (event.key === 'Enter') {
        this.toggleListDisplay(0);
      } else if (event.key === 'ArrowDown') {
        this.listHidden = false;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      } else if (event.key === 'ArrowUp') {
        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      }
    }
  }

  toggleListDisplay(sender: number) {
    if (sender === 1) {
      this.listHidden = false;
      this.getFilteredList();
    } else {
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        this.listHidden = true;
        this.list.values.forEach(value => {
          if (!value.displayTitle.includes(this.inputItem)) {
            this.showError = true;
            this.filteredList = this.list.values;
          } else {
            this.showError = false;
          }
        });
      }, 200);
    }
  }

  clearInput() {
    this.inputItem = '';

    this.filter = {
      title: this.filterTitle,
      type: ParameterType.COMBO_DICT,
      value: null
    };

    this.emptyInput = true;
    this.listHidden = true;
    this.selectedIndex = -1;

    this.comboFilter.emit(this.filter);
  }
}
