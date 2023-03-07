import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {

  amount = 1

  constructor(private slService: ShoppingListService){}

  onAddItem(submitForm: NgForm){

    const { name, amount } = submitForm.value

    this.slService.addIngredient(new Ingredient(name, amount))
  }



  // onAddingInShoppingList(e: SubmitEvent){
  //   e.preventDefault()
  //   this.slService.addIngredient(new Ingredient(this.inputName.nativeElement.value, this.inputAmount.nativeElement.value))
  //   // this.emitIngredient.emit(new Ingredient(this.inputName.nativeElement.value, this.inputAmount.nativeElement.value))
  // }

}
