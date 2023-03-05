import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = []
  private igChangeSub: Subscription

  constructor(private shoppingListService: ShoppingListService ){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.igChangeSub = this.shoppingListService.IngredientsChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients
    })
  }

  getEmittedIngredient(ingredient: Ingredient){

    this.shoppingListService.addIngredient(ingredient)

  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe()
  }
}
