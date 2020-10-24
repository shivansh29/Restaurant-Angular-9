import { Ingredient } from './../../shared/ingredient.model';
import * as ShopListActions from './shop-list.action';

export interface State{
    ingredients:  Ingredient[],
      singleIngred: Ingredient,
      index: number
}


const initialState: State = { 
ingredients:  [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 4)
  ],
  singleIngred: null,
  index: -1
}

export function shopListReducer(state: State = initialState, action: ShopListActions.ShopListActions){

    switch(action.type){
        case ShopListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients,action.payload]
            };
        case ShopListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShopListActions.UPDATE_INGREDIENT:
            let ingred= state.ingredients[state.index];
            let updateIngred = { ...ingred, ...action.payload};
            let update = [...state.ingredients];
            update[state.index] =  updateIngred;
            return {
                ...state,
                ingredients: update,
                singleIngred: null,
                index: -1
            };
        case ShopListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter( (ig,igIndex) =>{
                    return igIndex !== state.index
                } ),
                singleIngred: null,
                index: -1
            };
        case ShopListActions.START_EDIT:
            return {
                ...state,
                singleIngred: {...state.ingredients[action.payload]},
                index: action.payload
            };
        case ShopListActions.STOP_EDIT:
            return {
                ...state,
                singleIngred: null,
                index: -1
            };
        default :
            return state;
    }
}