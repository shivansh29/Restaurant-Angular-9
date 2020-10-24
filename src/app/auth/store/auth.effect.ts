import { UserData } from './../user.model';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap , map, tap} from 'rxjs/operators';
import * as AuthActions from './auth.action';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


export interface AuthResponseData{
    kind: string;
    idToken: string;
    email : string;
    refreshToken : string;
    expiresIn:  string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffect{
    constructor( private actions$: Actions, private http: HttpClient, 
                private router: Router,private authServ: AuthService){}

    @Effect()
    authLogin = this.actions$.pipe( 
        ofType(AuthActions.LOGIN_START),
        switchMap( (authData: AuthActions.LoginStart) =>{
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken : true
        }
        ).pipe( tap( (resData)=>{
            this.authServ.autoLogout(+resData.expiresIn * 1000);
        } ),
            map( resData=>{
                return handleAuthentication(resData);
            } ),
            catchError( errorRes=>{
               return handleError(errorRes);
            } )
        )
        } )
     )

        @Effect({dispatch: false})
     authSuccess = this.actions$.pipe(
         ofType(AuthActions.AUTHENTICATE_SUCCESS),
         tap( (authSuccessAction: AuthActions.AuthenticateSuccess)=>{
             if(authSuccessAction.payload.redirect)
             this.router.navigate(['/']);
         } )
     )
        
     @Effect({dispatch: false})
     autoLogout = this.actions$.pipe( ofType(AuthActions.LOGOUT), tap( ()=>{
         this.authServ.clearLogout();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
     } ));

     @Effect()
     autoLogin = this.actions$.pipe( ofType(AuthActions.AUTO_LOGIN), map( ()=>{
        let user: {
            email:string, 
            id:string, 
            _token:string,
            _tokenExpirationDate:string
        } =  JSON.parse(localStorage.getItem('userData'));
        if(!user)
        return { type: 'DUMMY'};

        const loadedUser = new UserData(user.email,user.id,user._token, new Date(user._tokenExpirationDate));

        if(loadedUser.token){
            //this.user.next(loadedUser);
            let exp = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.authServ.autoLogout(exp);
            return new AuthActions.AuthenticateSuccess({
                email: loadedUser.email,
                id: loadedUser.id,
                token: loadedUser.token,
                tokenExpirationDate: new Date(user._tokenExpirationDate),
                redirect: false
            })
        }
        return { type: 'DUMMY'};
     } )) 

     @Effect()
     signUpSucsess = this.actions$.pipe(
         ofType(AuthActions.SIGNUP_START),
         switchMap( (authData: AuthActions.SignUpStart) =>{
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken : true
        })
        .pipe( tap( (resData)=>{
            this.authServ.autoLogout(+resData.expiresIn * 1000);
        } ),
            map( (resData)=>{
                return handleAuthentication(resData);
            } ),
            catchError( (errorRes)=>{
                return handleError(errorRes);
            } )
        )
        })   
     );

}

const handleAuthentication = (resData) =>{
    let expirationtime = new Date(new Date().getTime() +  +resData.expiresIn * 1000);
             let user = new UserData(resData.email,resData.localId,resData.idToken,expirationtime);   
        localStorage.setItem('userData', JSON.stringify(user));
                 return   new AuthActions.AuthenticateSuccess({
                        email: resData.email,
                        id: resData.localId,
                        token: resData.idToken,
                        tokenExpirationDate: expirationtime,
                        redirect: true
                    });
                
            };

const handleError = (errorRes) =>{
    let error='something occured';

        if(!errorRes.error || !errorRes.error.error)
        return  of( new AuthActions.AuthenticateFail(error)); 

        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
            error = 'Email Already Exists';
            break;
            case 'EMAIL_NOT_FOUND':
                error='Email not found';
                break;
            case 'INVALID_PASSWORD':
                error = 'Invalid password';
                break;
          }

                return of(new AuthActions.AuthenticateFail(error));
}
