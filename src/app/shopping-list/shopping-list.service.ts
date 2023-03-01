import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService{

    IngredientsChanged = new EventEmitter<Ingredient[]>()

    private ingredients: Ingredient[] = [
        new Ingredient('PEPPERONI', 2),
        new Ingredient('Salame', 5),
        new Ingredient('Tomato', 5)
    ]

    getIngredients(){
        return this.ingredients.slice()
    }

    addIngredient(ingredient: Ingredient){
        // this.ingredients.push(ingredient)

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

        this.IngredientsChanged.emit(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredient[]){
        // for (let ingr of ingredients){
        //     this.addIngredient(ingr)
        // }
        this.ingredients.push(...ingredients)
        this.IngredientsChanged.emit(this.ingredients.slice())
    }

}