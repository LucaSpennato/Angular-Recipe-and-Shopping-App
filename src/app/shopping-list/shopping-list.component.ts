import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = []

  constructor(private shoppingListService: ShoppingListService ){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListService.IngredientsChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients
    })
  }

  getEmittedIngredient(ingredient: Ingredient){

    this.shoppingListService.addIngredient(ingredient)

  }
}
