import { Recipe } from './../../recipe.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  @Input('recipe') recipe: Recipe

  @Output() recipeIsClicked = new EventEmitter<void>()

  isClicked(){
    this.recipeIsClicked.emit()
  }

}
