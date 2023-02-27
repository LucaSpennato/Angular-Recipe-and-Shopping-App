import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput', { static: true }) inputName: ElementRef
  @ViewChild('amountInput', { static: true }) inputAmount: ElementRef

  @Output() emitIngredient = new EventEmitter<Ingredient>()

  ingredients: Ingredient[] = []

  onAddingInShoppingList(e: SubmitEvent){
    e.preventDefault()
    
    this.emitIngredient.emit(new Ingredient(this.inputName.nativeElement.value, this.inputAmount.nativeElement.value))
  }

}
