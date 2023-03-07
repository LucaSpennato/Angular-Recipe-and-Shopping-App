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
  editedItemIndex: number = -1
  editedItem: Ingredient

  constructor(private slService: ShoppingListService){}

  onSubmit(submitForm: NgForm){

    const { name, amount } = submitForm.value
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, new Ingredient(name, amount))
    }else{
      this.slService.addIngredient(new Ingredient(name, amount))
    }
    this.editMode = false
    this.editedItemIndex = -1
    submitForm.reset()
    submitForm.form.patchValue({
      amount: 1
    })
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

  onClear(){
    this.shoppingListForm.form.setValue({
      name: '',
      amount: 1 
    })
    this.editMode = false
    this.editedItemIndex = -1
  }
  
  onDeleteItem(){
    if(this.editedItemIndex !== -1){
      this.slService.deleteIngredient(this.editedItemIndex)
      this.shoppingListForm.form.setValue({
        name: '',
        amount: 1
      })
      this.editedItemIndex = -1
    }
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
