import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{

    // IngredientsChanged = new EventEmitter<Ingredient[]>()
    IngredientsChanged = new Subject<Ingredient[]>()

    startedEditing = new Subject<number>()

    private ingredients: Ingredient[] = [
        new Ingredient('PEPPERONI', 2),
        new Ingredient('Salame', 5),
        new Ingredient('Tomato', 5)
    ]

    getIngredients(){
        return this.ingredients.slice()
    }

    getIngredient(index: number){
        return this.ingredients[index]
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

        this.IngredientsChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient
        this.IngredientsChanged.next(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredient[]){
        // for (let ingr of ingredients){
        //     this.addIngredient(ingr)
        // }
        this.ingredients.push(...ingredients)
        this.IngredientsChanged.next(this.ingredients.slice())
    }

}