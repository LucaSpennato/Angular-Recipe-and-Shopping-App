import { Ingredient } from './../shared/ingredient.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {

  ingredients: Ingredient[] = [
    new Ingredient('PEPPERONI', 2),
    new Ingredient('Salame', 5),
    new Ingredient('Tomato', 5)
  ]

  getEmittedIngredient(ingredient: Ingredient){

    let isFound = undefined

    this.ingredients.forEach((ingr,index)=>{
      if(ingr.name.toLowerCase() === ingredient.name.toLowerCase()){
        isFound = index
      }
    })
    if(isFound !== undefined){
     this.ingredients[isFound].amount = +this.ingredients[isFound].amount + +ingredient.amount
    }else{
      this.ingredients.push(ingredient)
    }

  }
}
