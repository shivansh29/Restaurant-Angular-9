import { Action } from '@ngrx/store';
import { Recipie } from '../recipie.model';


export const SET_VALUE = '[Recip] SET_VALUE';
export const FETCH_VALUE = '[Recip] FETCH_VALUE';
export const ADD_RECIPIE = '[Recip] ADD_RECIPIE';
export const UPDATE_RECIPIE = '[Recip] UPDATE_RECIPIE';
export const DELETE_RECIPIE = '[Recip] DELETE_RECIPIE';
export const STORE_RECIPIES = '[Recip] STORE_RECIPIES';

export class SetValue implements Action{
    readonly type = SET_VALUE;

    constructor( public payload: Recipie[]){}
}

export class FetchValue implements Action{
    readonly type = FETCH_VALUE;

}

export class AddRecipie implements Action{
    readonly type = ADD_RECIPIE;

    constructor( public payload: Recipie){}
}

export class UpdateRecipie implements Action{
    readonly type = UPDATE_RECIPIE;

    constructor(public payload: { index: number, newRecipie: Recipie}){}
}

export class DeleteRecipie implements Action{
    readonly type = DELETE_RECIPIE;

    constructor(public payload: number){}
}

export class StoreRecipie implements Action{
    readonly type = STORE_RECIPIES;
}


export type RecipiActions = SetValue | FetchValue | UpdateRecipie | DeleteRecipie | AddRecipie | StoreRecipie;