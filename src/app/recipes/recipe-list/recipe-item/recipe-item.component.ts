import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  @Input('recipe') recipe: Recipe

  // @Output() recipeIsClicked = new EventEmitter<void>()

  constructor(private recipeService: RecipeService){}

  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe)
    // this.recipeIsClicked.emit()
  }

}
