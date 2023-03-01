import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './../recipes/recipe.model';

@Injectable()
export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>()

    private recipies: Recipe[] = [
        new Recipe('pizzazza', 'test desc', 
            'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9',
            [new Ingredient('Salame', 3), new Ingredient('Mozzarella', 1)]),
        new Recipe('focaccia', 'test desc', 
        'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9',
            [new Ingredient('Farina', 2), new Ingredient('Olio', 1)])
    ] 

    constructor(private slService: ShoppingListService){}

    getRecipies(){
        // usiamo slice solo per darci una copia e non una reference, altrimenti sarebbe modificabile
        // nonostante il private
        return this.recipies.slice()
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients)
    }

    
}