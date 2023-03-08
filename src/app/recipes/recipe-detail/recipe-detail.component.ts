import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe 
  id: number

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router ){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id']
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe(){
    // conil relative to salviamo tenriamo l'id, aggiungiamo solo l'edit al path esistente
    this.router.navigate(['edit'], { relativeTo: this.route })
    // altrimenti sarebbe così:
    // this.router.navigate(['../', this.id,'edit'], { relativeTo: this.route })
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['router'])
  }

}
