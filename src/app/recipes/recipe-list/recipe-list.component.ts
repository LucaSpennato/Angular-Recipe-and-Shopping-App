import { Recipe } from './../recipe.model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {

  recipiesNeedle: string = ''

  @Output() emittedRecipe = new EventEmitter<Recipe>()

  recipies: Recipe[] = [
    new Recipe('pizzazza', 'test desc', 
      'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9'),
      new Recipe('focaccia', 'test desc', 
      'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2022-05/Tomato-Pie_0256.jpg?itok=c63mh-z9')
  ] 

  getFilteredRecipies(): Recipe[]{
    if(this.recipiesNeedle === ''){
      return this.recipies
    }
    return this.recipies.filter( recipe => recipe.name.toLowerCase().includes(this.recipiesNeedle.toLowerCase())
    )
  }

  onRecipeItemClicked(recipe: Recipe){
    this.emittedRecipe.emit(recipe) 
  }

}
