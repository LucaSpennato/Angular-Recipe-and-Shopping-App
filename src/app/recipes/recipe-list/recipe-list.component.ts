import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipiesNeedle: string = ''

  // @Output() emittedRecipe = new EventEmitter<Recipe>()

  recipies: Recipe[] = []

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.recipies = this.recipeService.getRecipies()
  }

  getFilteredRecipies(): Recipe[]{
    if(this.recipiesNeedle === ''){
      return this.recipies
    }
    return this.recipies.filter( recipe => recipe.name.toLowerCase().includes(this.recipiesNeedle.toLowerCase())
    )
  }



}
