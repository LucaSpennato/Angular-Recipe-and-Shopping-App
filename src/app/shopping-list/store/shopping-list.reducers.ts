import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('PEPPERONI', 2),
    new Ingredient('Salame', 5),
    new Ingredient('Tomato', 5),
  ],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.Addingredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
      break;

    default:
      break;
  }
}
