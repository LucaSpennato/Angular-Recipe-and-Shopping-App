import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private baseUrl =
    'https://ng-recipeandshopping-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

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

  // ! FETCH RECIPES CON EXHAUST MERGE PER UNIRE DUE OBSERVABLES
  /**
   * @deprecated
   */
  fetchRecipesCON_EXTAUST() {
    // ? take ci permette di prendere un solo valore e successivamente questo observables farà da solo l'unsub
    // ! inoltre, non potendo passare cose da un ibs all'altro in questo caso, uniamo i due obs

    // ! Exaust map ASPETTA che il primo obs sia completo, in questo caso lo user (che succederà dopo aver preso l'ultimo user take(1)
    return this.authService.user.pipe(
      take(1),
      // ! DOPO ci passa lo user e ritorniamo un nuovo observables CHE SOSITUIRà COMPLETAMENTE
      // ! l'observables precedente dalla sua catena, in questo caso facciamo il return dell'obs http
      exhaustMap((user) => {
        // ! ED ESSENDO GIà in un pipe, non lo aggiungeremo anche all'observables http, ma mappiamo questo observables
        return this.http.get<Recipe[]>(this.baseUrl + 'recipes.json', {
          params: new HttpParams().set('auth', user.token),
        });
      }),
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
    // .pipe(
    //   map((recipes) => {
    //     return recipes.map((recipes) => {
    //       return {
    //         ...recipes,
    //         ingredients: recipes.ingredients ? recipes.ingredients : [],
    //       };
    //     });
    //   }),
    //   tap((recipes) => {
    //     this.recipeService.setRecipes(recipes);
    //   })
    // );
  }
}
