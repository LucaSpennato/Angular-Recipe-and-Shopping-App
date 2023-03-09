import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private baseUrl =
    'https://ng-recipeandshopping-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private recipeService: RecipeService, private http: HttpClient) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipies();

    return this.http
      .put(this.baseUrl + 'recipes.json', recipes)
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl + 'recipes.json').pipe(
      map((recipes) => {
        return recipes.map((recipes) => {
          return {
            ...recipes,
            ingredients: recipes.ingredients ? recipes.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
