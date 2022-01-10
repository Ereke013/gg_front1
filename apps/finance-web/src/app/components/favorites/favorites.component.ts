import { Component, OnInit } from '@angular/core';
import { FilterList } from '@finance-web/models/all-filters/FilterList';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  filterList: FilterList;
  tabName: string;

  constructor() {
  }

  ngOnInit(): void {
    this.filterList = { filters: [], paging: { limit: 10, offset: 0 }, city: localStorage.getItem('location') };
  }

}
