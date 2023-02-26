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

}
