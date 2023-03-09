import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolveService implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorageService,
    private recipeServ: RecipeService
  ) {}

  // ! Con questo resolver, chiamiamo il metodo che popolerà il ts se ci troviamo in recipes/:id o recipes/:id/edit
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // no subscribe perchè lo fa da solo nel resolver
    const recipes = this.recipeServ.getRecipies();
    if (recipes.length === 0) {
      return this.dataStorage.fetchRecipes();
    }

    return recipes;
  }
}
