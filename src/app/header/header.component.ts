import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dataStore: DataStorageService,
    private authServ: AuthService
  ) {}

  isuserAuth = false;
  private userSubscription: Subscription;
  private fecthDataSub: Subscription;

  // @Output() featureSelected = new EventEmitter<string>()

  // onSelect(feature: string){
  //   this.featureSelected.emit(feature)
  // }

  onSaveData() {
    this.dataStore.storeRecipe();
  }

  onFetchData() {
    this.dataStore.fetchRecipes().subscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authServ.user.subscribe((user) => {
      // this.isuserAuth = !user ? false : true;
      this.isuserAuth = !!user;

      if (this.isuserAuth) {
        this.fecthDataSub = this.dataStore.fetchRecipes().subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.fecthDataSub.unsubscribe();
  }
}
