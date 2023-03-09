import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './../recipes/recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipies: Recipe[] = [
  //   new Recipe(
  //     'pizzazza',
  //     'test desc',
  //     'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9',
  //     [new Ingredient('Salame', 3), new Ingredient('Mozzarella', 1)]
  //   ),
  //   new Recipe(
  //     'focaccia',
  //     'test desc',
  //     'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9',
  //     [new Ingredient('Farina', 2), new Ingredient('Olio', 1)]
  //   ),
  // ];

  private recipies: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipies = recipes;
    this.recipesChanged.next(this.recipies.slice());
  }

  getRecipies() {
    // usiamo slice solo per darci una copia e non una reference, altrimenti sarebbe modificabile
    // nonostante il private
    return this.recipies.slice();
  }

  getRecipe(index: number) {
    return this.recipies[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipies.push(recipe);
    this.recipesChanged.next(this.recipies.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipies[index] = recipe;
    this.recipesChanged.next(this.recipies.slice());
  }

  deleteRecipe(index: number) {
    this.recipies.splice(index, 1);
    this.recipesChanged.next(this.recipies.slice());
  }
}
