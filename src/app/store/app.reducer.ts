
import * as fromShopList from '../shopping-list/store/shop-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecip from '../recipies/store/recipies.reducer';

export interface AppState{
    shopList: fromShopList.State,
    auth : fromAuth.State ,
    recipie: fromRecip.State
}

export const appReducer: ActionReducerMap<AppState> = {
    shopList: fromShopList.shopListReducer,
    auth: fromAuth.AuthReducer,
    recipie: fromRecip.RecipReducer
}


