import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class Addingredient implements Action {
  readonly type = ADD_INGREDIENT;

  payload: Ingredient;
}
