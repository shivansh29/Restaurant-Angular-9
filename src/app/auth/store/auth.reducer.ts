import { UserData } from './../user.model';
import * as AuthAction from './auth.action';

export interface State{
    user: UserData,
    errorMsg: string,
    loading: boolean
}

const initialState: State = {
    user: null,
    errorMsg: null,
    loading: false
}

export function AuthReducer(state = initialState, action: AuthAction.AuthActions){
    
    switch(action.type){
        case AuthAction.AUTHENTICATE_SUCCESS:
            const user = new UserData(action.payload.email,action.payload.id
                ,action.payload.token,action.payload.tokenExpirationDate);
            return {
                ...state,
                user: user,
                loading: false
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthAction.LOGIN_START:
        case AuthAction.SIGNUP_START:
            return {
                ...state,
                errorMsg: null,
                loading: true
            };
        case AuthAction.AUTHENTICATE_FAIL:
            return {
                ...state,
                errorMsg: action.payload,
                user: null,
                loading: false
            };
        case AuthAction.CLEAR_ERROR:
            return {
                ...state,
                errorMsg: null
            };
        default:   return state;
    }

}