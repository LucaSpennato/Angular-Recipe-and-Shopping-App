import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private dataStore: DataStorageService) {}

  // @Output() featureSelected = new EventEmitter<string>()

  // onSelect(feature: string){
  //   this.featureSelected.emit(feature)
  // }

  onSaveData() {
    this.dataStore.storeRecipe();
  }

  onFetchData() {
    this.dataStore.fetchRecipes();
  }
}
