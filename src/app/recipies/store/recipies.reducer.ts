import { Actions } from '@ngrx/effects';
import { Recipie } from '../recipie.model';
import * as RecipAction from './recipie.action';

export interface State{
    recipie: Recipie[]
}

const initialState: State = {
    recipie: []
}

export function RecipReducer(state = initialState, action: RecipAction.RecipiActions){

    switch(action.type){
        case RecipAction.SET_VALUE:
            return {
                ...state,
                recipie: [...action.payload]
            };
        case RecipAction.ADD_RECIPIE: 
            return {
                ...state,
                recipie: [...state.recipie ,action.payload]
            };
        case RecipAction.UPDATE_RECIPIE:
            let update = {...state.recipie[action.payload.index], ...action.payload.newRecipie};
            let updatedItems = [...state.recipie];
            updatedItems[action.payload.index] = action.payload.newRecipie
            return {
                ...state,
                recipie: updatedItems
            };
        case RecipAction.DELETE_RECIPIE:
            return {
                ...state,
                recipie: state.recipie.filter(
                    (recip,index) =>{
                        return index!== action.payload;
                    }
                )
            };
        default:  return state;
    }

}