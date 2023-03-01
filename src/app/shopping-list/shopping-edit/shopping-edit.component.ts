import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput', { static: true }) inputName: ElementRef
  @ViewChild('amountInput', { static: true }) inputAmount: ElementRef

  // @Output() emitIngredient = new EventEmitter<Ingredient>()

  // ingredients: Ingredient[] = []

  constructor(private slService: ShoppingListService){}

  onAddingInShoppingList(e: SubmitEvent){
    e.preventDefault()
    this.slService.addIngredient(new Ingredient(this.inputName.nativeElement.value, this.inputAmount.nativeElement.value))
    // this.emitIngredient.emit(new Ingredient(this.inputName.nativeElement.value, this.inputAmount.nativeElement.value))
  }

}
