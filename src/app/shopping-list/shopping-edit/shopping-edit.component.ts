import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('frm', { static: false }) shoppingListForm: NgForm

  amount = 1

  editingSubscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient

  constructor(private slService: ShoppingListService){}

  onAddItem(submitForm: NgForm){

    const { name, amount } = submitForm.value
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, new Ingredient(name, amount))
    }else{
      this.slService.addIngredient(new Ingredient(name, amount))
    }
  }

  ngOnInit(): void {
    this.editingSubscription = this.slService.startedEditing.subscribe(
      (index: number)=>{
        this.editedItemIndex = index
        this.editMode = true
        this.editedItem = this.slService.getIngredient(index)
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe()
  }

  // onAddingInShoppingList(e: SubmitEvent){
  //   e.preventDefault()
  //   this.slService.addIngredient(new Ingredient(this.inputName.nativeElement.value, this.inputAmount.nativeElement.value))
  //   // this.emitIngredient.emit(new Ingredient(this.inputName.nativeElement.value, this.inputAmount.nativeElement.value))
  // }


}
