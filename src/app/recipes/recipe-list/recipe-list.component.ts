import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipiesNeedle: string = ''

  // @Output() emittedRecipe = new EventEmitter<Recipe>()

  recipies: Recipe[] = []

  recipeSubscription: Subscription

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.recipies = this.recipeService.getRecipies()
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipe: Recipe[])=>{
        this.recipies = recipe
      }
    )
  }

  getFilteredRecipies(): Recipe[]{
    if(this.recipiesNeedle === ''){
      return this.recipies
    }
    return this.recipies.filter( recipe => recipe.name.toLowerCase().includes(this.recipiesNeedle.toLowerCase())
    )
  }

  onNewRecipe(){
    // siamo già in recipies quindi niente path, aggiungiamo new e basta
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe()
  }

}
