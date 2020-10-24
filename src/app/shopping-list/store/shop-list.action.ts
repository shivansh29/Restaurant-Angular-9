import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = '[shopList] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[shopList] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[shopList] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[shopList] DELETE_INGREDIENT';
export const START_EDIT = '[shopList] START_EDIT';
export const STOP_EDIT = '[shopList] STOP_EDIT';

export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;

    constructor(public payload:Ingredient){}
}

export class AddIngredients implements Action{
    readonly type = ADD_INGREDIENTS;

    constructor(public payload:Ingredient []){}
}

export class UpdateIngredient implements Action{
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient){}
}

export class DeleteIngredient implements Action{
    readonly type = DELETE_INGREDIENT;

}

export class StartEdit implements Action{
    readonly type = START_EDIT;

    constructor(public payload:number){}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;
}



export type ShopListActions = AddIngredient | AddIngredients | DeleteIngredient | UpdateIngredient
                                | StartEdit | StopEdit;
